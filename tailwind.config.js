const withMT = require("@material-tailwind/react/utils/withMT");
/** @type {import('tailwindcss').Config} */
module.exports = withMT({
  content: ["./**/*.jsx"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "rgba(255, 126, 58, 1)",
        secondary: "#EBEFF4",
        text_color: "#2E3271",
        section_bg: "#E1DEDE"
      },
      backgroundImage: () => ({
        "gradient-primary": `linear-gradient(270deg, rgba(227, 83, 0, 0.06) 0%, rgba(255, 255, 255, 0.00) 70.83%)`,
      }),
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        "open-sans": ["Open Sans", "sans-serif"],
        "manrope": ["Manrope", "sans-serif"]
      },
      screens: {
        xs: "375px",
        "2xs": "375px",
        "3xs": "320px",
        'mobileScreen': {'max': '375px'},
        'mobile-md': {'max': '545px'},
        'mobile-lg': {'max': '745px'},
        'tablet': {'max': '1024px'},
        'tablet-sm': {'max': '900px'},
        'laptop': {'max': '1440px'},
        'laptop-sm': {'max': '1250px'}
      },
    },
  },
  // eslint-disable-next-line no-undef
});