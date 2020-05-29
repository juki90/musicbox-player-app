import { createMuiTheme } from "@material-ui/core/styles";

const globalFontFamily = '"Balsamiq Sans", sans-serif';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#62d9fb",
    },
  },
  typography: {
    fontFamily: globalFontFamily,
    fontSize: 18,
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
