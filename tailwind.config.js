/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#915EFF',
        secondary: '#7c3aed',
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
      },
      screens: {
        'xs': '475px',
      },
    },
  },
  plugins: [],
}

