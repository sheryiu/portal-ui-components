const plugin = require("tailwindcss/plugin");
const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  darkMode: "class",
  theme: {
    containers: {
      '2xs': '18rem',
      xs: '25rem',
      sm: '37rem',
      md: '45rem',
      lg: '61rem',
      xl: '77rem',
    },
    fontSize: {
      kbd: ["0.75rem", "1"],
      sm: ["0.8125rem", "1rem"],
      base: ["0.875rem", "1.125rem"],
      xl: ["1.25rem", "1.625rem"],
    },
    borderRadius: {
      'none': '0rem',
      'full': '9999px',
      '1': '0.25rem',
      '2': '0.5rem',
      '3': '0.75rem',
      '4': '1rem'
    },
    extend: {
      zIndex: {
        100: '100',
      },
      screens: {
        '3xl': '1920px'
      },
      backgroundImage: {
        "gradient-160": "linear-gradient(160deg, var(--tw-gradient-stops))",
        'gradient-radial': 'radial-gradient(var(--gradient-radial-shape, circle) at var(--gradient-position, center), var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 0deg at var(--gradient-position, center), var(--tw-gradient-stops))',
      },
      fontFamily: {
        symbols: ["'Material Symbols Outlined'"],
        sans: ["Nunito", ...defaultTheme.fontFamily.sans],
        display: ["'MuseoModerno'", ...defaultTheme.fontFamily.sans],
      },
      spacing: () => ({
        ...Array(20)
          .fill(0)
          .map((_, i) => (i + 1) * 5)
          .reduce(
            (acc, size) => ({
              ...acc,
              [`${size}vh`]: `${size}svh`,
              [`${size}vw`]: `${size}svw`,
            }),
            {}
          ),
        18: "4.5rem",
        22: "5.5rem",
        120: "30rem"
      }),
      colors: {
        secondary: "rgb(var(--color-secondary, 173 173 173) / <alpha-value>)",
        hover:
          "rgb(var(--color-hover) / var(--color-hover-opacity, <alpha-value>))",
        primary: {
          DEFAULT: '#5BA43E',
          50: '#DFE7DC',
          100: '#CFE9C5',
          200: '#B7DEA7',
          300: '#9ED38A',
          400: '#86C76C',
          500: '#6EBC4F',
          600: '#5BA43E',
          700: '#447B2F',
          800: '#2E531F',
          900: '#172A10',
          950: '#080f06'
        },
        accent: {
          DEFAULT: '#3e6e7a',
          '50': '#f1f7f9',
          '100': '#ddecee',
          '200': '#c1dbe1',
          '300': '#95c3cb',
          '400': '#61a1ae',
          '500': '#478794',
          '600': '#3e6e7a',
          '700': '#375d67',
          '800': '#334f57',
          '900': '#2f454c',
          '950': '#1b2d31',
        },
        'lunar-green': {
          '50': '#f7f8f7',
          '100': '#e3e4e2',
          '200': '#c7cac4',
          '300': '#a3a6a0',
          '400': '#7f837c',
          '500': '#666a62',
          '600': '#51544f',
          '700': '#4a4c48',
          '800': '#282a28',
          '900': '#212220',
          '950': '#0a0a0a',
        },
      },
      minWidth: ({ theme }) => ({
        ...theme("spacing"),
      }),
      maxWidth: ({ theme }) => ({
        ...theme("spacing"),
      }),
    },
  },
  plugins: [
    require('@tailwindcss/container-queries'),
    plugin(
      ({
        addVariant,
        addUtilities,
        addComponents,
        addBase,
        matchVariant,
        matchUtilities,
        theme,
      }) => {
        addBase({
          html: {
            "min-height": "100svh",
            height: "100%",
            "overflow": "hidden",
          },
          body: {
            "min-height": "100svh",
            height: "100%",
          },
          h1: {
            "font-size": "1.75rem",
            "line-height": "2.25rem",
            "letter-spacing": "-0.05rem",
            "font-family": theme("fontFamily.display"),
            "font-weight": "700",
            "text-overflow": "ellipsis",
            "overflow": "hidden",
            "white-space": "nowrap",
          },
          h2: {
            "font-size": "1.75rem",
            "line-height": "2.25rem",
            "letter-spacing": "-0.025rem",
            "font-family": theme("fontFamily.display"),
            "font-weight": "500",
            "text-overflow": "ellipsis",
            "overflow": "hidden",
            "white-space": "nowrap",
          },
          h3: {
            "font-size": "1.25rem",
            "line-height": "1.625rem",
            "font-family": theme("fontFamily.display"),
            "font-weight": "400",
            "text-overflow": "ellipsis",
            "overflow": "hidden",
            "white-space": "nowrap",
          },
          "button[role=button]": {
            "font-weight": "500"
          }
        });
        addComponents({
          ".bg-glass": {
            '.dark &': {
              background: "radial-gradient(farthest-corner at top left, rgb(69 69 69 / 40%) 20%, rgb(29 29 29 / 70%))",
              border: "1px solid rgba(255, 255, 255, 0.1)",
            },
            background: "radial-gradient(farthest-corner at top left, rgb(250 250 250 / 40%) 20%, rgb(240 240 240 / 70%))",
            border: "1px solid rgba(0, 0, 0, 0.1)",
            "border-radius": "16px",
            "backdrop-filter": "blur(6px)",
          },
          ".bg-deep-glass": {
            '.dark &': {
              background: "radial-gradient(farthest-corner at top left, rgb(44 44 44), rgb(33 33 33))",
            },
            background: "radial-gradient(farthest-corner at top left, rgb(245 245 245) 60%, rgb(240 240 240))",
            "border-radius": "16px",
          },
          ".bg-deep-glass-high-contrast": {
            '.dark &': {
              background: "radial-gradient(farthest-corner at top left, rgb(60 60 60), rgb(50 50 50))",
            },
            background: "radial-gradient(farthest-corner at top left, rgb(200 200 200), rgb(180 180 180))",
            "border-radius": "16px",
          },
          ".bg-side-content": {
            ".dark &": {
              background: "hsl(0deg 0% 8.5%)"
            },
            background: "hsl(0deg 0% 92%)"
          }
        });
        matchUtilities(
          {
            icon: (value) => {
              return {
                display: "flex",
                "align-items": "center",
                "justify-content": "center",
                width: theme("spacing." + value),
                height: theme("spacing." + value),
                "font-size": theme("spacing." + value),
                "font-style": "normal",
                "font-family": "'Material Symbols Rounded'",
                "font-weight": "400",
                "user-select": "none",
              };
            },
          },
          {
            type: "length",
            values: { 4: 4, 5: 5, 6: 6, 8: 8, 10: 10 },
          }
        );
        matchUtilities(
          {
            'font-variation-weight': (value) => {
              return {
                "--font-variation-weight": `"wght" ${ value }`,
                fontVariationSettings:
                  'var(--font-variation-weight, "wght" 400), var(--font-variation-fill, "FILL" 0)',
              }
            }
          },
          {
            type: 'number',
            values: {
              'extra-light': '200',
              'light': '300',
              'normal': '400',
              'bold': '700',
            }
          }
        );
        addVariant('has-focus-visible', '&:has(:focus-visible)');
        addUtilities({
          ".font-variation-fill": {
            "--font-variation-fill": '"FILL" 1',
            fontVariationSettings:
              'var(--font-variation-weight, "wght" 400), var(--font-variation-fill, "FILL" 0)',
          },
        });
        addUtilities({
          ".break-anywhere": {
            "overflow-wrap": "anywhere",
          },
          ".gutter-stable": {
            "scrollbar-gutter": "stable"
          }
        });
        matchUtilities({
          'gradient-position': (value) => {
            return {
              '--gradient-position': value,
            }
          }
        }, {
          type: ['position'],
          values: {
            'center': 'center'
          }
        })
      }
    ),
    // monster hunter module only
    plugin(
      ({ addComponents }) => {
        addComponents({
          '.elemental-gradient': {
            '.dark &': {
              '--tw-gradient-stops': 'hsl(0deg 50% 50%), hsl(224deg 50% 50%), hsl(60deg 65% 70%), hsl(195deg 50% 55%), hsl(245deg 60% 50%), hsl(0deg 50% 50%)'
            },
            '--tw-gradient-stops': 'hsl(0deg 50% 65%), hsl(224deg 40% 60%), hsl(60deg 65% 70%), hsl(195deg 50% 75%), hsl(245deg 40% 60%), hsl(0deg 50% 65%)'
          },
          '.hexagon-mask': {
            'clip-path': 'polygon(50% 0%, 95% 25%, 95% 75%, 50% 100%, 5% 75%, 5% 25%)'
          }
        })
      }
    )
  ],
};
