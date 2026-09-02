/**
 * Generates `src/data-source-static/data/maps-data.json` from the SEADE
 * population projection CSV.
 *
 * The CSV is the long-format source: one row per district / year / sex / 5-year
 * age band. This collapses it to the shape the app's static data source
 * validates — one row per district per year, with the three elderly bands and
 * the all-ages total, both sexes summed.
 *
 * Run it whenever the source CSV is replaced:
 *
 * ```bash
 * node scripts/generateMapsData.ts
 * node scripts/generateMapsData.ts path/to/other.csv
 * ```
 *
 * Every invariant the map depends on is asserted here rather than trusted: an
 * unexpected age-band label, a missing district in some year, or an id the
 * geometry does not carry stops the run instead of producing a snapshot that
 * paints silently wrong — a district with no matching row keeps MapLibre's
 * fallback colour, which is indistinguishable from a genuinely low value.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import process from 'node:process';

import { DISTRICTS_BBOX } from '../src/components/map/lib/mapCamera.ts';

/** Repository root, resolved from this script's own location. */
const ROOT = path.resolve(import.meta.dirname, '..');

/** Default source CSV, versioned alongside the snapshot it generates. */
const DEFAULT_CSV = path.join(
  ROOT,
  'src/data-source-static/data/raw/evolucao_msp_pop_sexo_idade.csv'
);

/** Generated snapshot consumed by `readStaticMapsData`. */
const OUT_FILE = path.join(ROOT, 'src/data-source-static/data/maps-data.json');

/** District geometry, read only to validate the ids this script derives. */
const GEOJSON_FILE = path.join(ROOT, 'public/distrito-municipal-v2.geojson');

/**
 * The CSV is Latin-1, not UTF-8 — decoding it as UTF-8 mangles every accented
 * district name, and those names reach the map's tooltip.
 */
const CSV_ENCODING = 'latin1';

/** Column separator used by the SEADE export. */
const CSV_DELIMITER = ';';

/**
 * Offset between SEADE's district code and the geometry's feature id.
 *
 * SEADE codes the 96 districts of the capital as 80001-80096, and the geometry
 * carries feature ids 1-96 in the same order, so the id is the code minus this
 * offset. Derived rather than read from a name crosswalk because the relation
 * is exact and is verified below against the GeoJSON's own id set; a name-based
 * join would additionally have to survive accent and casing drift.
 */
const SEADE_CODE_OFFSET = 80000;

/** Every district in the file belongs to the capital; the CSV has no such column. */
const MUNICIPIO = 'São Paulo';

/** The elderly age-band labels this script reads, exactly as the CSV spells them. */
const BAND_65_69 = '65 a 69';
const BAND_70_74 = '70 a 74';
const BAND_75_PLUS = '75 e +';

/** Number of 5-year age bands the CSV carries per district / year / sex. */
const EXPECTED_BANDS = 16;

/** Districts the capital is divided into. */
const EXPECTED_DISTRICTS = 96;

/** Columns the SEADE export is expected to carry, in order. */
const EXPECTED_HEADER = [
  'cod_distr',
  'nome_distr',
  'ano',
  'sexo',
  'Idade',
  'populacao',
];

/** One row of the generated snapshot; mirrors `StaticMapsDataSource.districts`. */
type DistrictRow = {
  ano: number;
  cod_distr: number;
  nome: string;
  municipio: string;
  geometry_id: number;
  count_65_69: number;
  count_70_74: number;
  count_75plus: number;
  total: number;
};

/** One parsed CSV line, before aggregation. */
type SourceRow = {
  codDistrito: number;
  nome: string;
  ano: number;
  idade: string;
  populacao: number;
};

/**
 * Ascending unique years present in `districts`.
 *
 * @param districts - Snapshot rows.
 * @returns The years, ascending.
 *
 * @example
 * yearsOf(districts); // [2000, 2005, 2010]
 */
const yearsOf = (districts: DistrictRow[]): number[] => {
  return [
    ...new Set(
      districts.map((district) => {
        return district.ano;
      })
    ),
  ].sort((a, b) => {
    return a - b;
  });
};

/**
 * Parses the SEADE CSV into typed rows, dropping the blank lines that pad the
 * end of the export.
 *
 * @param csvPath - Absolute path to the CSV.
 * @returns One entry per populated data line.
 * @throws If the header is not {@link EXPECTED_HEADER}.
 *
 * @example
 * parseSourceRows('/abs/evolucao.csv'); // [{ codDistrito: 80001, ano: 2000, ... }]
 */
const parseSourceRows = (csvPath: string): SourceRow[] => {
  const lines = readFileSync(csvPath, CSV_ENCODING).split(/\r?\n/);
  const header = (lines[0] ?? '').split(CSV_DELIMITER).map((cell) => {
    return cell.trim();
  });

  if (header.join(',') !== EXPECTED_HEADER.join(',')) {
    throw new Error(
      `[generateMapsData] unexpected header: ${header.join(CSV_DELIMITER)}`
    );
  }

  const rows: SourceRow[] = [];

  for (const line of lines.slice(1)) {
    const cells = line.split(CSV_DELIMITER).map((cell) => {
      return cell.trim();
    });
    const [codDistrito, nome, ano, sexo, idade, populacao] = cells;

    // The export pads its tail with empty lines. A row missing any dimension is
    // not aggregatable, so it is skipped rather than defaulted.
    if (!codDistrito || !ano || !sexo || !idade || !populacao) {
      continue;
    }

    rows.push({
      codDistrito: Number(codDistrito),
      nome: nome ?? '',
      ano: Number(ano),
      idade,
      populacao: Number(populacao),
    });
  }

  return rows;
};

/**
 * Asserts the age bands are the ones this script knows how to read.
 *
 * Checked because the elderly counts are matched by label: a renamed band would
 * not fail, it would quietly sum to zero.
 *
 * @param bandsSeen - Every distinct `Idade` value in the CSV.
 * @param bandsPerCell - Distinct bands per district/year, keyed `year|code`.
 * @throws If a band this script reads is absent, or a cell is short of bands.
 *
 * @example
 * assertBands({ bandsSeen, bandsPerCell }); // throws when "75 e +" was renamed
 */
const assertBands = ({
  bandsSeen,
  bandsPerCell,
}: {
  bandsSeen: Set<string>;
  bandsPerCell: Map<string, Set<string>>;
}): void => {
  for (const band of [BAND_65_69, BAND_70_74, BAND_75_PLUS]) {
    if (!bandsSeen.has(band)) {
      throw new Error(
        `[generateMapsData] the CSV has no "${band}" band, so that count would come out as zero. Seen: ${[...bandsSeen].join(', ')}`
      );
    }
  }

  if (bandsSeen.size !== EXPECTED_BANDS) {
    throw new Error(
      `[generateMapsData] expected ${EXPECTED_BANDS} age bands, found ${bandsSeen.size}: ${[...bandsSeen].join(', ')}`
    );
  }

  for (const [key, bands] of bandsPerCell) {
    if (bands.size !== EXPECTED_BANDS) {
      throw new Error(
        `[generateMapsData] ${key} carries ${bands.size} of ${EXPECTED_BANDS} age bands, so its total would be understated`
      );
    }
  }
};

/**
 * Collapses parsed rows to one entry per district per year, summing both sexes.
 *
 * `total` is the sum of every age band, which is what the rates the map paints
 * divide by — the CSV provides no such column.
 *
 * @param rows - Parsed CSV rows.
 * @returns Snapshot rows, sorted by year then geometry id.
 *
 * @example
 * aggregate(rows); // [{ ano: 2000, geometry_id: 1, count_65_69: 2577, ... }]
 */
const aggregate = (rows: SourceRow[]): DistrictRow[] => {
  const byCell = new Map<string, DistrictRow>();
  const bandsSeen = new Set<string>();
  const bandsPerCell = new Map<string, Set<string>>();

  for (const row of rows) {
    bandsSeen.add(row.idade);

    const key = `${row.ano}|${row.codDistrito}`;
    const cell = byCell.get(key) ?? {
      ano: row.ano,
      cod_distr: row.codDistrito,
      nome: row.nome,
      municipio: MUNICIPIO,
      geometry_id: row.codDistrito - SEADE_CODE_OFFSET,
      count_65_69: 0,
      count_70_74: 0,
      count_75plus: 0,
      total: 0,
    };

    cell.total += row.populacao;

    if (row.idade === BAND_65_69) {
      cell.count_65_69 += row.populacao;
    } else if (row.idade === BAND_70_74) {
      cell.count_70_74 += row.populacao;
    } else if (row.idade === BAND_75_PLUS) {
      cell.count_75plus += row.populacao;
    }

    byCell.set(key, cell);

    const bands = bandsPerCell.get(key) ?? new Set<string>();
    bands.add(row.idade);
    bandsPerCell.set(key, bands);
  }

  assertBands({ bandsSeen, bandsPerCell });

  return [...byCell.values()].sort((a, b) => {
    return a.ano - b.ano || a.geometry_id - b.geometry_id;
  });
};

/** Nested coordinate arrays, as GeoJSON geometry carries them. */
type Coordinates = number[] | Coordinates[];

/** The district mesh, read for id and extent validation. */
type GeoJson = {
  features: { id: number; geometry: { coordinates: Coordinates } }[];
};

/**
 * Asserts `DISTRICTS_BBOX` still describes the mesh.
 *
 * The app frames its camera off that constant instead of parsing the GeoJSON —
 * MapLibre fetches the mesh, the app never reads it — so nothing at runtime
 * would notice the two drifting apart. Replacing the mesh with a different
 * extent would leave the map framing the old one, off-centre or cropped, with
 * no error anywhere. This is the check that makes that impossible.
 *
 * @param geojson - The parsed district mesh.
 * @throws If the mesh's extent differs from the constant.
 *
 * @example
 * assertBbox(geojson); // throws after the mesh is swapped for another city
 */
const assertBbox = (geojson: GeoJson): void => {
  const bbox = {
    minLng: Number.POSITIVE_INFINITY,
    maxLng: Number.NEGATIVE_INFINITY,
    minLat: Number.POSITIVE_INFINITY,
    maxLat: Number.NEGATIVE_INFINITY,
  };

  const visit = (coordinates: Coordinates): void => {
    if (typeof coordinates[0] === 'number') {
      const [lng, lat] = coordinates as number[];

      bbox.minLng = Math.min(bbox.minLng, lng ?? 0);
      bbox.maxLng = Math.max(bbox.maxLng, lng ?? 0);
      bbox.minLat = Math.min(bbox.minLat, lat ?? 0);
      bbox.maxLat = Math.max(bbox.maxLat, lat ?? 0);

      return;
    }

    for (const nested of coordinates as Coordinates[]) {
      visit(nested);
    }
  };

  for (const feature of geojson.features) {
    visit(feature.geometry.coordinates);
  }

  // The mesh's coordinates carry four decimals, so the bounds are exact and an
  // epsilon only absorbs float noise from the comparison itself.
  const drifted = (['minLng', 'maxLng', 'minLat', 'maxLat'] as const).filter(
    (edge) => {
      return Math.abs(bbox[edge] - DISTRICTS_BBOX[edge]) > 1e-9;
    }
  );

  if (drifted.length > 0) {
    throw new Error(
      `[generateMapsData] DISTRICTS_BBOX no longer matches ${path.basename(GEOJSON_FILE)} (${drifted.join(', ')}). ` +
        `The map frames its camera off that constant, so update it in src/components/map/lib/mapCamera.ts: ${JSON.stringify(bbox)}`
    );
  }
};

/**
 * Asserts the snapshot can actually drive the map: every year carries every
 * district, every derived `geometry_id` exists in the geometry, no total is
 * zero, and the years are evenly spaced.
 *
 * The even spacing matters because the timeline control is a numeric range —
 * it walks `min` to `max` by a constant `step`, so an irregular series would
 * land on years the data does not carry.
 *
 * @param districts - Aggregated snapshot rows.
 * @throws If any of those invariants is broken.
 *
 * @example
 * validate(districts); // throws on a year missing a district
 */
const validate = (districts: DistrictRow[]): void => {
  const geojson: GeoJson = JSON.parse(readFileSync(GEOJSON_FILE, 'utf8'));
  const geometryIds = new Set(
    geojson.features.map((feature) => {
      return feature.id;
    })
  );

  assertBbox(geojson);

  const years = yearsOf(districts);

  for (const year of years) {
    const inYear = districts.filter((district) => {
      return district.ano === year;
    });

    if (inYear.length !== EXPECTED_DISTRICTS) {
      throw new Error(
        `[generateMapsData] year ${year} has ${inYear.length} districts, expected ${EXPECTED_DISTRICTS}`
      );
    }
  }

  for (const district of districts) {
    if (!geometryIds.has(district.geometry_id)) {
      throw new Error(
        `[generateMapsData] geometry_id ${district.geometry_id} (${district.nome}) has no polygon in ${path.basename(GEOJSON_FILE)}`
      );
    }

    if (district.total <= 0) {
      throw new Error(
        `[generateMapsData] ${district.nome} in ${district.ano} totals ${district.total}; every rate divides by it`
      );
    }
  }

  const steps = new Set(
    years.slice(1).map((year, index) => {
      return year - (years[index] ?? 0);
    })
  );

  if (steps.size > 1) {
    throw new Error(
      `[generateMapsData] years are not evenly spaced (${years.join(', ')}); the timeline needs a constant step`
    );
  }
};

const csvPath = process.argv[2] ?? DEFAULT_CSV;
const districts = aggregate(parseSourceRows(csvPath));

validate(districts);

writeFileSync(OUT_FILE, `${JSON.stringify({ districts }, null, 2)}\n`, 'utf8');

const years = yearsOf(districts);

console.log(
  `[generateMapsData] wrote ${districts.length} rows to ${path.relative(ROOT, OUT_FILE)} (${years.length} years, ${years[0]} to ${years[years.length - 1]}, step ${(years[1] ?? 0) - (years[0] ?? 0)})`
);
