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
      animation: {
        show: "show 0.5s ease-in-out forwards",
      },
      keyframes: {
        show: {
          "0%": { opacity: 0, transform: "scale(0.75)" },
          "100%": { opacity: 1, transform: "scale(1)" },
        },
      },
    },
  },
  plugins: [],
};
