export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        fancy: ["Pacifico", "cursive", "flower"],
      },
      colors: {
        rose: {
          DEFAULT: "#f43f5e", // rose-500
          light: "#f87171", // rose-400
          dark: "#b91c1c", // rose-700
          lighter: "#fee2e2", // rose-200
        },
      },
    },
  },
  plugins: [],
};
