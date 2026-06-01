#!/usr/bin/env python3
"""
Generate src/data-source-static/data/maps-data.json from the SEADE ODS file.

Reads absolute population counts by district and emits a flat JSON array of
district records with raw counts. Rates and classification thresholds are
computed by the app layer (toAppMapsData.ts); this JSON is the source-of-truth
only for absolute counts, district names, and municipality metadata.

Usage (from packages/app/):
    python3 tmp_data/generate_maps_data.py
    python3 tmp_data/generate_maps_data.py --ods /path/to/file.ods
"""

from __future__ import annotations

import argparse
import json
from pathlib import Path
from typing import Iterator

from odf.opendocument import load
from odf.table import Table, TableRow, TableCell
from odf.text import P

# Default ODS path — SEADE population file, kept outside the repository.
ODS_DEFAULT = Path.home() / "Documentos" / "2025_distritos_idade_pop.ods"
DST = (
    Path(__file__).parent.parent
    / "src"
    / "data-source-static"
    / "data"
    / "maps-data.json"
)

# Age-band label strings as they appear in the SEADE ODS.
BAND_65_69 = "65 a 69"
BAND_70_74 = "70 a 74"
BAND_75_PLUS = "75 e +"

YEAR = 2025


def _iter_rows(ods_path: Path) -> Iterator[dict]:
    """Yield each data row from the first sheet as a dict keyed by header."""
    doc = load(str(ods_path))
    sheet = doc.spreadsheet.getElementsByType(Table)[0]
    rows = sheet.getElementsByType(TableRow)

    def cells(row: TableRow) -> list[str]:
        return [
            str(c.getElementsByType(P)[0]) if c.getElementsByType(P) else ""
            for c in row.getElementsByType(TableCell)
        ]

    header = cells(rows[0])
    for row in rows[1:]:
        values = cells(row)
        if values[0]:  # skip empty trailing rows
            yield dict(zip(header, values))


def _aggregate(records: Iterator[dict]) -> dict[str, dict]:
    """Aggregate population counts by district from raw ODS rows.

    Returns a dict keyed by cod_distr containing nome_distr, total_pop,
    count_65_69, count_70_74, count_75plus, count_65plus, count_70plus.
    """
    agg: dict[str, dict] = {}
    for rec in records:
        code = rec["cod_distr"]
        pop = int(rec["populacao"])
        idade = rec["Idade"]

        if code not in agg:
            agg[code] = {
                "nome_distr": rec["nome_distr"],
                "total_pop": 0,
                "count_65_69": 0,
                "count_70_74": 0,
                "count_75plus": 0,
            }

        agg[code]["total_pop"] += pop
        if idade == BAND_65_69:
            agg[code]["count_65_69"] += pop
        elif idade == BAND_70_74:
            agg[code]["count_70_74"] += pop
        elif idade == BAND_75_PLUS:
            agg[code]["count_75plus"] += pop

    for d in agg.values():
        d["count_65plus"] = d["count_65_69"] + d["count_70_74"] + d["count_75plus"]
        d["count_70plus"] = d["count_70_74"] + d["count_75plus"]

    return agg



def main(ods_path: Path) -> None:
    """Orchestrate ODS \u2192 maps-data.json pipeline."""
    counts = _aggregate(_iter_rows(ods_path))

    districts = [
        {
            "ano": YEAR,
            "cod_distr": int(code),
            "nome": d["nome_distr"],
            "municipio": "S\u00e3o Paulo",
            "geometry_id": int(code) - 80000,
            "count_65_69": d["count_65_69"],
            "count_70_74": d["count_70_74"],
            "count_75plus": d["count_75plus"],
            "total": d["total_pop"],
        }
        for code, d in sorted(counts.items())
    ]

    output = {"districts": districts}

    DST.parent.mkdir(parents=True, exist_ok=True)
    with open(DST, "w") as f:
        json.dump(output, f, indent=2, ensure_ascii=False)

    print(f"OK: {len(districts)} districts \u2192 {DST}")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Generate maps-data.json from SEADE population ODS"
    )
    parser.add_argument(
        "--ods",
        type=Path,
        default=ODS_DEFAULT,
        help=f"Path to SEADE ODS file (default: {ODS_DEFAULT})",
    )
    args = parser.parse_args()
    main(args.ods)
