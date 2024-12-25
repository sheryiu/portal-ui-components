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

    addComponents({
      '.overlay-glass-bg': {
        'backdrop-filter': 'blur(16px)',
        'background': 'hsl(0deg 0% 15% / .7)',
        'box-shadow': 'inset rgb(255 255 255 / .03) 0 0 4px, rgb(0 0 0 / .1) 12px 12px 6px'
      },
      '.light-glass-bg': {
        'backdrop-filter': 'blur(6px)',
        'background': 'hsl(0deg 0% 75% / .05)',
        'box-shadow': 'inset rgb(255 255 255 / .03) 0 0 4px, rgb(0 0 0 / .1) 12px 12px 6px'
      },
      '.light-glass-bg-subtle': {
        'background': 'hsl(0deg 0% 75% / .05)',
        'box-shadow': 'inset rgb(255 255 255 / .03) 0 0 4px, rgb(0 0 0 / .1) 4px 2px 3px'
      },
      '.transparency-mask-to-r': {
        'mask-image': 'linear-gradient(to right, black var(--tw-gradient-from-position, 0%), transparent var(--tw-gradient-to-position, 100%))'
      }
    })

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
            "line-height": "1",
            "font-style": "normal",
            "font-family": "'Material Symbols Rounded'",
            "font-weight": "400",
            "user-select": "none",
            "flex": "none",
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
    // bg-hover
    addUtilities({
      '.bg-hover': {
        "background-color": "rgb(var(--color-hover, 0 0 0) / var(--color-hover-opacity, 0.1))",
      }
    });
    // text-secondary
    addUtilities({
      '.text-secondary': {
        "color": "rgb(var(--color-secondary, 150 150 150))",
      }
    });
    // spacer
    addUtilities({
      '.spacer': {
        "flex": "1 0 auto",
      }
    });
    // base
    addBase({
      '*, *::before, *::after': {
        'border-color': 'rgb(0 0 0 / .1)',
      },
      ':where(.dark *), :where(.dark *)::before, :where(.dark *)::after': {
        'border-color': 'rgb(255 255 255 / .1)'
      },
      ':root': {
        '--color-hover': '0 0 0',
        '--color-hover-opacity': '0.1',
        '--color-secondary': '120 120 120',
      },
      '.dark': {
        '--color-hover': '255 255 255',
        '--color-hover-opacity': '0.07',
        '--color-secondary': '173 173 173',
        'color-scheme': 'dark',
      }
    })
  }
)