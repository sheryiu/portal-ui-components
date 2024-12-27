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
    fontSize: {
      sm: ["0.8125rem", "1rem"],
      base: ["0.875rem", "1.125rem"],
      md: ["1rem", "1.25rem"],
      xl: ["1.25rem", "1.625rem"],
      '2xl': ["1.75rem", "2.25rem"],
    },
    extend: {
      fontFamily: {
        sans: ["Nunito", ...defaultTheme.fontFamily.sans],
        display: ["'MuseoModerno'", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [
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
          h3: {
            "font-size": "1rem",
            "line-height": "1.375rem",
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
      }
    ),
  ],
};
