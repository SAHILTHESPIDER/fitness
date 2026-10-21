/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        navy: "#070b14",
        ink: "#0c1424",
        panel: "#10192b",
        lime: "#d6ff4a",
        cyan: "#5ce1ff",
        mist: "#e7f2ff",
        amber: "#f0b429",
        danger: "#ff5a6a",
      },
      fontFamily: {
        display: ["Syne", "Impact", "sans-serif"],
        sans: ["Outfit", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
