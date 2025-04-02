"use client";
import { createTheme } from "@mui/material/styles";
import { srRS } from "@mui/material/locale";

const defaultTheme = createTheme(
  {
    palette: {
      mode: "dark",
      primary: {
        main: "#1976d2",
      },
      secondary: {
        main: "#2ec5d3",
      },
    },
    typography: {
      fontFamily: "Open Sans",
      h1: {
        fontFamily: "Ubuntu Mono",
      },
      h2: {
        fontFamily: "Ubuntu Mono",
      },
      h3: {
        fontFamily: "Ubuntu Mono",
      },
      h4: {
        fontFamily: "Ubuntu Mono",
      },
      h6: {
        fontFamily: "Ubuntu Mono",
      },
      h5: {
        fontFamily: "Ubuntu Mono",
      },
      subtitle1: {
        fontFamily: "Ubuntu Mono",
      },
      subtitle2: {
        fontFamily: "Ubuntu Mono",
      },
      button: {
        fontFamily: "Ubuntu Mono",
        fontWeight: 900,
      },
      overline: {
        fontFamily: "Ubuntu Mono",
      },
    },
    cssVariables: true,
  },
  srRS
);

export default defaultTheme;
