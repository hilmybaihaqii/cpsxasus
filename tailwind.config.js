/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // Ini adalah warna tema utama Anda
        primary: "#BA2025",

        // Anda bisa tambahkan warna lain di sini
        light: "#FFFFFF",
        dark: "#000000",
        // Anda juga bisa menambahkan warna sekunder, misal abu-abu
        gray: {
          100: "#EFEFEF",
          200: "#C7C7C7",
        },
      },
      fontFamily: {
        // Ini sudah benar, sesuai dengan nama file font Anda
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
