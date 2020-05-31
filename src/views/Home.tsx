import React from "react";
import Paper from "@material-ui/core/Paper";
import introImage from "../assets/intro-image.svg";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Box, Link } from "@material-ui/core";
import { theme } from "../styles/theme";
import Fab from "@material-ui/core/Fab";
import SearchIcon from "@material-ui/icons/Search";
import { routes } from "../routes";
import { useCommonStyles } from "./Root";

const useStyles = makeStyles({
  introImg: {
    display: "block",
    maxWidth: "50%",
    height: "auto",
    margin: "1em auto",
  },
  fab: {
    letterSpacing: "1px",
    display: "flex",
    margin: "1.5em auto",
    width: "140px",
    justifyContent: "space-around",
    "& a": {
      color: "#000",
      "&:hover": {
        textDecoration: "none",
      },
    },
  },
});

const Home: React.FC = () => {
  const classes = useStyles();
  const commonClasses = useCommonStyles();
  return (
    <Box p="1.5em 0">
      <ThemeProvider theme={theme}>
        <Paper className={commonClasses.cardOuter} elevation={0}>
          <Typography
            className={commonClasses.introHeading}
            variant="h3"
            component="h1"
          >
            Music box player
          </Typography>
          <img className={classes.introImg} src={introImage} alt="Notes line" />
          <Typography>
            <Typography
              className={commonClasses.contentHeading}
              align="center"
              variant="h4"
            >
              Welcome to our player!
            </Typography>
            <Typography
              align="center"
              className={commonClasses.paragraph}
              variant="body1"
            >
              Search now
            </Typography>
            <Fab
              className={classes.fab}
              color="primary"
              variant="extended"
              aria-label="edit"
            >
              <SearchIcon />
              <Link href={routes.search}>Search</Link>
            </Fab>
            <Typography className={commonClasses.paragraph} variant="body1">
              With this app you can search, collect, listen and watch videos
              from youtube and vimeo.
            </Typography>
            <Typography className={commonClasses.paragraph} variant="body1">
              First of all, you will need to search for videos, you may choose
              between searching in youtube, vimeo or both at the same time. Go
              to
              <Link href={routes.search}> search here</Link>.
            </Typography>
            <Typography className={commonClasses.paragraph} variant="body1">
              When you search for videos, you can add them to{" "}
              <Link href={routes.collection}> collection</Link> or
              <Link href={routes.playlists}> playlists</Link>.
            </Typography>
            <Typography className={commonClasses.paragraph} variant="body1">
              This app is using Youtube API and Vimeo API
            </Typography>
          </Typography>
        </Paper>
      </ThemeProvider>
    </Box>
  );
};

export default Home;
