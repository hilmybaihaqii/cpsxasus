/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#BA2025",
        accent: "#E2DDB4",
        dark: "#000000",
        light: "#FFFFFF",

        "primary-light-bg": "#FEEBEB",
        "primary-light-border": "#FDD8D8",
        gray: {
          200: "#E5E7EB",
          400: "#9CA3AF",
          700: "#374151",
        },
        state: {
          on: {
            lamp: { text: "#D97706", bg: "#FEF3C7" },
            fan: { text: "#0891B2", bg: "#CFFAFE" },
          },
          off: { text: "#6B7280", bg: "#F3F4F6" },
          alert: {
            motion: { text: "#2563EB", bg: "#DBEAFE" },
          },
        },
      },
      fontFamily: {
        "poppins-bold": ["Poppins-Bold"],
        "poppins-extralight": ["Poppins-ExtraLight"],
        "poppins-medium": ["Poppins-Medium"],
        "poppins-regular": ["Poppins-Regular"],
        "poppins-semibold": ["Poppins-SemiBold"],
        "roboto-medium": ["Roboto-Medium"],
        "roboto-regular": ["Roboto-Regular"],
        "roboto-semibold-italic": ["Roboto-SemiBoldItalic"],
      },
    },
  },
  plugins: [],
};
