/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ["sans-serif", "Golos", "bebas-neue", "cursive"],
    },
    extend: {
      colors: {
        "task-dark": "#29212D",
        "task-light-dark": "#3E3641",
        "task-light-white": "#F3F4F4",
        "task-white": "#F8F8F8",
        "task-blue": "#3C3CB3",
      },
    },
  },
  plugins: [],
};
