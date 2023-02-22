import { createTheme, responsiveFontSizes } from "@mui/material/styles";
const theme = responsiveFontSizes(
  createTheme({
    direction: "rtl",

    palette: {
      mode: "light",

      primary: {
        light: "#135134",
        main: "#009688",
        dark: "#006661",
      },
      secondary: {
        main: "#96000e",
      },
      error: {
        main: "#e91e63",
      },
      info: {
        main: "#ffffff",
        dark: "#000000",
      },
    },
    spacing: 4,
    shape: {
      borderRadius: 4,
    },

    typography: {
      fontFamily: ["IranianSans", "Anjoman-Regular"].join(","),
    },
  })
);

export { theme };
