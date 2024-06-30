/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        pp: "350px",
        medium: "500px",
        lg: "1200px",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        teal: {
          50: "#E6FCF5",
          100: "#C3FAE8",
          200: "#96F2D7",
          300: "#63E6BE",
          400: "#38D9A9",
          500: "#20C997",
          600: "#12B886",
          700: "#0CA678",
          800: "#099268",
          900: "#087F5B",
        },
        gray: {
          0: "#FFF",
          50: "#F8F9FA",
          100: "#F1F3F5",
          200: "#E9ECEF",
          300: "#DEE2E6",
          400: "#CED4DA",
          500: "#ADB5BD",
          600: "#868E96",
          700: "#495057",
          800: "#343A40",
          900: "#212529",
        },
        black: {
          0: "#000",
          50: "#171719",
          100: "#1B1B1B",
          200: "#2B2A2A",
          300: "#2E2C2C",
          400: "#4F4F4F",
          500: "#B1B1B1",
          600: "#BBBB",
          800: "#B6B6B6",
          700: "#969696",
          900: "#797979",
        },
      },
    },
  },
  plugins: [],
};
