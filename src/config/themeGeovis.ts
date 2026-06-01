/**
 * Geovis design tokens — cartographic color scales and map semantic colors.
 *
 * The semantic slice of this object is re-exported as `mapTokens` from `theme.ts`.
 * Consumer code must import `mapTokens` from `theme.ts`, never from this file directly.
 */

const ref = <T extends string>(path: T) => {
  return `{${path}}` as const;
};

export const geovisTokens = {
  core: {
    dataviz: {
      color: {
        data: {
          sequential: {
            blue: [
              '#C6DBEF',
              '#B2D2E8',
              '#9ECAE1',
              '#86BCDC',
              '#6BAED6',
              '#58A0CE',
              '#4292C6',
              '#3987C0',
              '#2E7CBB',
              '#2171B5',
              '#1761A8',
              '#08519C',
              '#094083',
              '#08306B',
            ],

            green: [
              '#C7E9C0',
              '#B4E1AE',
              '#A1D99B',
              '#8BCF89',
              '#74C476',
              '#5CB769',
              '#41AB5D',
              '#37A055',
              '#2E964D',
              '#238B45',
              '#147C38',
              '#006D2C',
              '#005823',
              '#00441B',
            ],

            yellowOrange: [
              '#EFC22F',
              '#EFB22B',
              '#EEA227',
              '#ED9223',
              '#EC8121',
              '#EA7020',
              '#E75D1E',
              '#D9532A',
              '#CB4932',
              '#BD3F37',
              '#AD3E37',
              '#9E3C37',
              '#8E3A36',
              '#7F3835',
            ],

            orange: [
              '#FFF5EB',
              '#FEE6CE',
              '#FDDAB8',
              '#FDD0A2',
              '#FDBF86',
              '#FDAE6B',
              '#FD9E53',
              '#FD8D3C',
              '#F57B25',
              '#F16913',
              '#E6570A',
              '#D94801',
              '#B73903',
              '#8C2D04',
            ],

            red: [
              '#FCBBA1',
              '#FCA78A',
              '#FC9272',
              '#FC7E5E',
              '#FB6A4A',
              '#F5543B',
              '#EF3B2C',
              '#DD2A24',
              '#CB181D',
              '#B81419',
              '#A50F15',
              '#860A14',
              '#67000D',
              '#4F000A',
            ],

            greenBlue: [
              '#CCEBC5',
              '#BAE4BD',
              '#A8DDB5',
              '#91D5BC',
              '#7BCCC4',
              '#67C0CC',
              '#4EB3D3',
              '#40A4CC',
              '#3498C5',
              '#2B8CBE',
              '#187AB5',
              '#0868AC',
              '#08548F',
              '#084081',
            ],
          },
          diverging: {
            blueOrange: [
              '#084081',
              '#08548F',
              '#0868AC',
              '#187AB5',
              '#2B8CBE',
              '#7BCCC4',
              '#F4DFC5',
              '#EFC22F',
              '#ED9223',
              '#E75D1E',
              '#BD3F37',
              '#9E3C37',
              '#7F3835',
            ],

            greenRed: [
              '#00441B',
              '#005823',
              '#006D2C',
              '#147C38',
              '#238B45',
              '#74C476',
              '#F4DFC5',
              '#FCBBA1',
              '#FC9272',
              '#FB6A4A',
              '#EF3B2C',
              '#CB181D',
              '#67000D',
            ],
          },
          categorical: {
            default: [
              '#2F5F73',
              '#9C5737',
              '#3F4F30',
              '#7B5B8E',
              '#8A5A13',
              '#4F7E7A',
              '#8B2E24',
              '#6B5F54',
              '#3B6C8E',
              '#6A7D3C',
              '#A45A72',
              '#7A4B2E',
            ],
          },
        },

        neutral: {
          missing: '#D8CEC0',
          suppressed: '#BEB4A6',
          masked: '#EEE6DA',
        },

        interaction: {
          selected: '#1F1712',
          focus: '#2F5F73',
          hover: '#9C5737',
        },
      },

      opacity: {
        low: 0.32,
        medium: 0.56,
        high: 0.72,
        selected: 0.92,
        muted: 0.38,
      },

      stroke: {
        solid: [],
        dashed: [4, 3],
        dotted: [1, 3],
      },

      pattern: {
        none: 'none',
        diagonal: 'diagonal',
        crosshatch: 'crosshatch',
        dots: 'dots',
      },

      shape: {
        circle: 'circle',
        square: 'square',
        triangle: 'triangle',
        diamond: 'diamond',
      },
    },
  },

  semantic: {
    dataviz: {
      color: {
        // light-to-dark gradients for ordered quantitative data; choropleth and value-mapped layers.
        sequential: {
          1: ref('core.dataviz.color.data.sequential.blue'),
          2: ref('core.dataviz.color.data.sequential.green'),
          3: ref('core.dataviz.color.data.sequential.yellowOrange'),
          4: ref('core.dataviz.color.data.sequential.orange'),
          5: ref('core.dataviz.color.data.sequential.red'),
          6: ref('core.dataviz.color.data.sequential.greenBlue'),
        },
        // unordered discrete colors for nominal/qualitative categories.
        categorical: {
          1: ref('core.dataviz.color.data.categorical.default'),
        },
        // midpoint-anchored scales for signed deviations from a reference value.
        diverging: {
          1: ref('core.dataviz.color.data.diverging.blueOrange'),
          2: ref('core.dataviz.color.data.diverging.greenRed'),
        },

        status: {
          missing: ref('core.dataviz.color.neutral.missing'),
          suppressed: ref('core.dataviz.color.neutral.suppressed'),
          masked: ref('core.dataviz.color.neutral.masked'),
        },

        state: {
          selected: ref('core.dataviz.color.interaction.selected'),
          focus: ref('core.dataviz.color.interaction.focus'),
          hover: ref('core.dataviz.color.interaction.hover'),
        },
      },

      opacity: {
        area: ref('core.dataviz.opacity.high'),
        areaSubtle: ref('core.dataviz.opacity.medium'),
        muted: ref('core.dataviz.opacity.muted'),
        selected: ref('core.dataviz.opacity.selected'),
      },

      stroke: {
        default: ref('core.dataviz.stroke.solid'),
        uncertainty: ref('core.dataviz.stroke.dotted'),
        estimate: ref('core.dataviz.stroke.dashed'),
      },

      pattern: {
        default: ref('core.dataviz.pattern.none'),
        uncertainty: ref('core.dataviz.pattern.diagonal'),
        suppressed: ref('core.dataviz.pattern.crosshatch'),
      },

      shape: {
        point: ref('core.dataviz.shape.circle'),
        comparison: ref('core.dataviz.shape.square'),
        alert: ref('core.dataviz.shape.triangle'),
      },
    },
  },
} as const;
