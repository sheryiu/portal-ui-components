/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    borderRadius: {
      'none': '0rem',
      'full': '9999px',
      '1': '0.25rem',
      '2': '0.5rem',
      '3': '0.75rem',
      '4': '1rem',
      '5': '1.25rem',
      '6': '1.5rem',
      '7': '1.75rem',
      '8': '2rem',
    },
    extend: {
      zIndex: {
        100: '100',
      },
      screens: {
        'xs': '480px',
        '3xl': '1920px'
      },
      containers: ({ theme }) => ({
        'screen-xs': theme('screens.xs'),
        'screen-sm': theme('screens.sm'),
        'screen-md': theme('screens.md'),
        'screen-lg': theme('screens.lg'),
        'screen-xl': theme('screens.xl'),
        'screen-2xl': theme('screens.2xl')
      }),
      spacing: ({ theme }) => ({
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
        26: "6.5rem",
        58: "14.5rem",
        88: "22rem",
        120: "30rem",
        160: "40rem",
        200: "50rem",
        'screen-xs': theme('screens.xs'),
        'screen-sm': theme('screens.sm'),
        'screen-md': theme('screens.md'),
        'screen-lg': theme('screens.lg'),
        'screen-xl': theme('screens.xl'),
        'screen-2xl': theme('screens.2xl')
      }),
      colors: {
        primary: {
          50: 'rgb(var(--color-primary-50, 223 231 220) / <alpha-value>)',
          100: 'rgb(var(--color-primary-100, 207 233 197) / <alpha-value>)',
          200: 'rgb(var(--color-primary-200, 183 222 167) / <alpha-value>)',
          300: 'rgb(var(--color-primary-300, 158 211 138) / <alpha-value>)',
          400: 'rgb(var(--color-primary-400, 134 199 108) / <alpha-value>)',
          500: 'rgb(var(--color-primary-500, 110 188 79) / <alpha-value>)',
          600: 'rgb(var(--color-primary-600, 91 164 62) / <alpha-value>)',
          700: 'rgb(var(--color-primary-700, 68 123 47) / <alpha-value>)',
          800: 'rgb(var(--color-primary-800, 46 83 31) / <alpha-value>)',
          900: 'rgb(var(--color-primary-900, 23 42 16) / <alpha-value>)',
          950: 'rgb(var(--color-primary-950, 8 15 6) / <alpha-value>)'
        },
        accent: {
          50: 'rgb(var(--color-accent-50, 239 246 255) / <alpha-value>)',
          100: 'rgb(var(--color-accent-100, 219 234 254) / <alpha-value>)',
          200: 'rgb(var(--color-accent-200, 191 219 254) / <alpha-value>)',
          300: 'rgb(var(--color-accent-300, 147 197 253) / <alpha-value>)',
          400: 'rgb(var(--color-accent-400, 96 165 250) / <alpha-value>)',
          500: 'rgb(var(--color-accent-500, 59 130 246) / <alpha-value>)',
          600: 'rgb(var(--color-accent-600, 37 99 235) / <alpha-value>)',
          700: 'rgb(var(--color-accent-700, 29 78 216) / <alpha-value>)',
          800: 'rgb(var(--color-accent-800, 30 64 175) / <alpha-value>)',
          900: 'rgb(var(--color-accent-900, 30 58 138) / <alpha-value>)',
          950: 'rgb(var(--color-accent-950, 23 37 84) / <alpha-value>)'
        },
        neutral: {
          50: 'rgb(var(--color-neutral-50, 250 250 250) / <alpha-value>)',
          100: 'rgb(var(--color-neutral-100, 245 245 245) / <alpha-value>)',
          200: 'rgb(var(--color-neutral-200, 229 229 229) / <alpha-value>)',
          300: 'rgb(var(--color-neutral-300, 212 212 212) / <alpha-value>)',
          400: 'rgb(var(--color-neutral-400, 163 163 163) / <alpha-value>)',
          500: 'rgb(var(--color-neutral-500, 115 115 115) / <alpha-value>)',
          600: 'rgb(var(--color-neutral-600, 82 82 82) / <alpha-value>)',
          700: 'rgb(var(--color-neutral-700, 64 64 64) / <alpha-value>)',
          800: 'rgb(var(--color-neutral-800, 38 38 38) / <alpha-value>)',
          900: 'rgb(var(--color-neutral-900, 23 23 23) / <alpha-value>)',
          950: 'rgb(var(--color-neutral-950, 10 10 10) / <alpha-value>)'
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
    require('./tailwind-plugin'),
  ]
}