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
      // TODO
      // '.transparency-mask-to-r': {
      //   'mask-image': 'linear-gradient(to right, black var(--tw-gradient-from-position, 0%), transparent var(--tw-gradient-to-position, 100%))'
      // }
    })
  }
)