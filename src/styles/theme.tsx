import { createMuiTheme } from "@material-ui/core/styles";

const globalFontFamily = "'Manrope', sans-serif";

export const headingGradient =
  "linear-gradient(45deg, rgba(171,191,195,0.5046219171262255) 0%, rgba(158,170,173,0.4962185557816877) 33%, rgba(119,138,142,0.4962185557816877) 66%, rgba(153,163,166,0.5046219171262255) 100%)";

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#62d9fb",
    },
    secondary: {
      main: "#a2eae4",
    },
  },
  typography: {
    fontFamily: globalFontFamily,
    fontSize: 16,
    h1: {
      fontFamily: globalFontFamily,
    },
    h2: {
      fontFamily: globalFontFamily,
    },
    h3: {
      fontFamily: globalFontFamily,
    },
    h4: {
      fontFamily: globalFontFamily,
    },
    h5: {
      fontFamily: globalFontFamily,
    },
    h6: {
      fontFamily: globalFontFamily,
    },
    button: {
      fontFamily: globalFontFamily,
    },
  },
});

export default theme;
