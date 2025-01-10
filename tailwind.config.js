/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        unifraktur: ["UnifrakturMaguntia", "cursive"],
        cormorant: ["Cormorant", "serif"],
        greatVibes: ["Great Vibes", "cursive"],
      },
    },
  },
  plugins: [],
};
