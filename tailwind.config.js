/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",  
    "./src/components/**/*.{js,ts,jsx,tsx}", 
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1E40AF",   
        secondary: "gray-600",
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },


    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
};
