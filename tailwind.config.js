/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [],
  theme: {
    // colors: {
    //   'primary': '#0070f3',
    // },
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        fractul: ['Fractul', 'serif',],
      },
      colors: {
        'primary': {
          '50': '#fff1f3',
          '100': '#ffe0e4',
          '200': '#FBD9DD', // Light
          '300': '#ffa0ac',
          '400': '#ff697c',
          '500': '#f93a53',
          '600': '#e71d37', // Base
          '700': '#c2132a',
          '800': '#a01426',
          '900': '#851725',
        },
      }
    },
  },
  plugins: [],
}

