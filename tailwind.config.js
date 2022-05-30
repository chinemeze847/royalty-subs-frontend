module.exports = {
  content: ["./app/**/*.{ts,tsx,jsx,js}"],
  theme: {
    container: {
      center: true,
      padding: '1rem',
    }, 
    extend: {
      colors: ({ colors }) => ({
        'color-primary': colors.purple['800'],
        'color-primary-variant': colors.purple['400'],
        'color-on-primary': colors.white,
        'color-surface': colors.white,
        'color-on-surface': colors.black,
        'color-background': colors.gray['400'],
        'color-error': colors.red['500'],
        'color-on-error': colors.white,
      }),

      spacing: {
        'dimen-xxs': '0.25rem',
        'dimen-xs': '0.5rem',
        'dimen-sm': '0.75rem',
        'dimen-md': '1rem',
        'dimen-lg': '1.25rem',
        'dimen-xl': '1.5rem',
        'dimen-xxl': '1.75rem',
        'dimen-xxxl': '2rem',
      },
    },
  },
  plugins: [],
}
