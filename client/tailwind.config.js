/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        marcellus: ['"Marcellus SC"', 'serif'],
      },
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'white': '#ffffff',
      'yellow': '#FFB732',
      'background': '#FAFAFA',
      'lightText': '#939393',
      "cardBg": '#FFFFFF66',
      'black': '#000',
      'dark': '#3C3E40',
      'light': '#E6E6E6',
      'red': '#FF4647',
      'green': '#50B380',
      "blue":"#655DD3",
      "softYellow": "#ffb73280",
      "modalBg": "#00000099"
    },
    boxShadow: {
      "card": "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
      "sidebar": "rgba(0, 0, 0, 0.24) 0px 3px 8px",
    }
  },
  plugins: [],
}