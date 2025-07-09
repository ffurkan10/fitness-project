/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'white': '#ffffff',
      'yellow': '#FFB732',
      'background': '#FAFAFA;',
      'black': '#000',
      'dark': '#3C3E40',
      'light': '#6E7073',
      'red': '#FF4647',
      'green': '#50B380',
      "blue":"#655DD3",
      "softYellow": "#ffb73280",
      "modalBg": "#00000099"
    },
    boxShadow: {
      "card": "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
      "sidebar": "rgba(0, 0, 0, 0.24) 0px 3px 8px;",
    }
  },
  plugins: [],
}