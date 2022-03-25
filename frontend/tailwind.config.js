module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        darkBlue: "rgba(16, 20, 30, 1)",
        greyishBlue: "rgba(90, 105, 143, 1)",
        semiDarkBlue: "rgba(22, 29, 47, 1)",
        red: "rgba(252, 71, 71, 1)",
      },
      screens: {
        sm: "375px",
        md: "768px",
        lg: "1440px",
      },
    },
  },
};
