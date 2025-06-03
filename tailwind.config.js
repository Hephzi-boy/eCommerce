/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./App.tsx", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily:{
        IBMPlexMono: ["IBMPlexMono-Medium"],
        IBMPlexSans: ["IBMPlexSans-VariableFont_wdth,wght"]
      },
      colors: {
        "primary": "blue",
        "secondary": "navy blue",
        "tertiary": "red",
        "black": "black",
        "white": "white"
      }
    },
  },
  plugins: [],
}