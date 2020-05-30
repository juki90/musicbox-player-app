import React from "react";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Navigation from "./Navigation";
import AppBar from "@material-ui/core/AppBar";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import logo from "../assets/logo.svg";
import theme from "../styles/theme";

const useStyles = makeStyles({
  header: {
    height: "60px",
    paddingTop: "5px",
    paddingBottom: "5px",
  },
  headerContainer: {
    height: "100%",
    [theme.breakpoints.up("md")]: {
      padding: 0,
    },
  },
  headerBox: {
    height: "100%",
  },
  homeLink: {
    width: "51px",
  },
  button: {
    padding: "8px 0",
    borderRadius: 0,
  },
});

const Header: React.FC = () => {
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <AppBar
        className={classes.header}
        position="fixed"
        component="header"
        aria-label="menu"
      >
        <Container className={classes.headerContainer} maxWidth="lg">
          <Box
            className={classes.headerBox}
            display="flex"
            flexDirection="row"
            alignItems="center"
          >
            <IconButton className={classes.button} aria-label="home link">
              <a className={classes.homeLink} href="/">
                <img src={logo} alt="Logo" />
              </a>
            </IconButton>
            <Navigation />
          </Box>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;
