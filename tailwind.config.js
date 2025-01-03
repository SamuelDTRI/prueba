/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#212121", 
        secondary: "#FFFFFF", 
        thirt: "#424242",
        background: "#F0F0F0", 
        text: "#000000", 
        button: "#FFC107",
      },
    },
  },
  plugins: [],
};
