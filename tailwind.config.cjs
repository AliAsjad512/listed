/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        mobileS: "320px",
        mobileM: "375px",
        mobileL: "425px",
        mobileXl: "480px",
      },
    },
  },
  plugins: [],
};
