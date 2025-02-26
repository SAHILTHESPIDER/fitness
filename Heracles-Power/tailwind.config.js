/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      colors:{
        "custom-black":"#1f1f1f",
        "golden":"#FFC100"
      }
    },
  },
  plugins: [
    require('daisyui'),
  ],
}