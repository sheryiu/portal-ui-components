const plugin = require("tailwindcss/plugin");
const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./projects/demo/**/*.{html,ts}"],
  darkMode: "class",
  presets: [
    require('./projects/portal-ui-ng/assets/tailwind-preset'),
  ],
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
      '2xl': ["1.75rem", "2.25rem"],
    },
    extend: {
      backgroundImage: {
        "gradient-160": "linear-gradient(160deg, var(--tw-gradient-stops))",
        'gradient-radial': 'radial-gradient(var(--gradient-radial-shape, circle) at var(--gradient-position, center), var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 0deg at var(--gradient-position, center), var(--tw-gradient-stops))',
      },
      fontFamily: {
        sans: ["Nunito", ...defaultTheme.fontFamily.sans],
        display: ["'MuseoModerno'", ...defaultTheme.fontFamily.sans],
      },
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
            "letter-spacing": "-0.025rem",
            "font-family": theme("fontFamily.display"),
            "font-weight": "700",
            "text-overflow": "ellipsis",
            "overflow": "hidden",
            "white-space": "nowrap",
            "padding-top": "1.5rem",
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
            "padding-top": "1rem",
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
          "strong": {
            "color": theme('colors.primary.600'),
            ".dark &": {
              "color": theme('colors.primary.500'),
            }
          },
          "button[role=button]": {
            "font-weight": "500"
          }
        });
        addComponents({
          ".bg-drawer-content": {
            ".dark &": {
              background: theme('colors.neutral.900')
            },
            background: theme('colors.neutral.100')
          }
        });
        matchUtilities({
          'gradient-shape': (value) => {
            return {
              '--gradient-radial-shape': value
            }
          }
        }, {
          type: ['position'],
          values: {
            'circle': 'circle',
            'ellipse': 'ellipse',
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
