/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#154C79",
      },
      fontFamily: {
        rConLight: ["Roboto_Condensed-Light", "sans-serif"],
        rConMedItalic: ["Roboto_Condensed-MediumItalic", "sans-serif"],
        rlight: ["Roboto-Light", "sans-serif"],
        rlightItalic: ["Roboto-LightItalic", "sans-serif"],
        rmedium: ["Roboto-Medium", "sans-serif"],
        rregular: ["Roboto-Regular", "sans-serif"],
        rsemibold: ["Roboto-SemiBold", "sans-serif"],
      },
    },
  },
  plugins: [],
};
