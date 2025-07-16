/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/**/*.html",
    "./src/**/*.{js,ts,jsx,tsx,css}"
  ],
  safelist: [
    {
      pattern: /.*/, // включает ВСЕ классы, чтобы не удалять ничего
    },
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        lora: ['Lora', 'serif'],
      },
      colors: {
        customOrange: 'rgb(255, 165, 0)',
      },
    },
  },
  plugins: [],
};
