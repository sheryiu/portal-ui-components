const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,ts}'
  ],
  theme: {
    extend: {
      spacing: () => ({
        ...Array(20).fill(0).map((_, i) => (i + 1) * 5).reduce((acc, size) => ({ ...acc, [`${size}vh`]: `${size}svh`, [`${size}vw`]: `${size}svw` }), {}),
        '22': '5.5rem'
      }),
      gridTemplateColumns: {
        'subgrid': 'subgrid'
      },
      colors: {
        primary: {
          '50': 'hsl(216, 33%, 95%)',
          '100': 'hsl(220, 38%, 90%)',
          '200': 'hsl(214, 35%, 80%)',
          '300': 'hsl(212, 35%, 70%)',
          '400': 'hsl(211, 34%, 55%)',
          '500': 'hsl(212, 33%, 45%)',
          '600': 'hsl(214, 36%, 36%)',
          '700': 'hsl(215, 35%, 30%)',
          '800': 'hsl(214, 33%, 23%)',
          '900': 'hsl(215, 30%, 20%)',
          '950': 'hsl(217, 30%, 14%)', /** main */
          '1000': 'hsl(217, 25%, 9%)',
        },
        accent: {
          '50': 'hsl(162, 100%, 97%)',
          '100': 'hsl(167, 100%, 89%)',
          '200': 'hsl(167, 100%, 77%)',
          '300': 'hsl(167, 99%, 64%)',
          '400': 'hsl(169, 85%, 50%)',
          '500': 'hsl(170, 100%, 41%)',
          '600': 'hsl(171, 100%, 33%)',
          '700': 'hsl(172, 100%, 25%)', /** main */
          '800': 'hsl(173, 89%, 22%)',
          '900': 'hsl(172, 79%, 19%)',
          '950': 'hsl(175, 100%, 10%)',
        },
      },
      minWidth: ({ theme }) => ({
        ...theme('spacing')
      }),
      maxWidth: ({ theme }) => ({
        ...theme('spacing')
      })
    },
  },
  plugins: [
    plugin(({ addUtilities, addComponents, addBase, matchVariant, matchUtilities, theme }) => {
      addBase({
        'body': {
          fontFamily: '"Nunito"'
        }
      });
      addComponents({
        '.material-icons': {},
        '.material-icons-outlined': {},
      })
      addBase({
        'h1': {
          fontSize: theme('fontSize.3xl'),
          fontWeight: theme('fontWeight.bold'),
          color: theme('colors.accent.500'),
          'text-transform': 'uppercase'
        }
      })
      matchUtilities({
        'view-transition': (value) => {
          return {
            'view-transition-name': value,
          }
        }
      }, {
        type: 'family-name'
      });
      matchUtilities({
        'icon': (value) => {
          return {
            'display': 'inline-block',
            'width': theme('spacing.' + value),
            'height': theme('spacing.' + value),
            'font-size': theme('spacing.' + value),
          }
        }
      }, {
        type: 'length',
        values: { 4: 4, 5: 5, 6: 6, 8: 8, 10: 10 },
      })
    })
  ],
}

