const plugin = require("tailwindcss/plugin");
module.exports = plugin(
  ({
    addVariant,
    addUtilities,
    addComponents,
    addBase,
    matchVariant,
    matchUtilities,
    theme,
  }) => {
    // Icons
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
    addUtilities({
      ".font-variation-fill": {
        "--font-variation-fill": '"FILL" 1',
        fontVariationSettings:
          'var(--font-variation-weight, "wght" 400), var(--font-variation-fill, "FILL" 0)',
      },
    });
    // break-anywhere, gutter-stable
    addUtilities({
      ".break-anywhere": {
        "overflow-wrap": "anywhere",
      },
      ".gutter-stable": {
        "scrollbar-gutter": "stable"
      }
    });
  }
)