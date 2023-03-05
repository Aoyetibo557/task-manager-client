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
        "task-dark": "#0F1112",
        "task-light-dark": "#252524",
        "task-light-white": "#F3F4F4",
        "task-white": "#F8F8F8",
        "task-blue": "#3C3CB3",
        "task-sidebar-dark": "#37323E",
        "task-sidebar-light-dark": "#3D3A47",
      },
    },
  },
  plugins: [],
};
