/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        tmblue: {
          light: '#72AADD',
          dark: '#2D2A70'
        },
        tmwhite: '#FFFFFFFF',
        tmgold: '#DDA400'
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
