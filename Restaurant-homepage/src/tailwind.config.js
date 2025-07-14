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
    extend: {},
  },
  plugins: [],
};
