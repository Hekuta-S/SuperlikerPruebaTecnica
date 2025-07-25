/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
 theme: {
    extend: {
      colors: {
        superdarkblue: "#0A2442",
        bluegreen:  "#65BAAF",
        inputbg: "#0A2440",
        inputborder: "#385CAD",
        placeholderblue: "#385CAD", 
      },
    },
    animation: {
      'popup-in': 'popup-in 0.4s ease-out forwards',
    },
  },
  plugins: [],
};
