import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { theme, headingGradient } from "../styles/theme";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import AppsIcon from "@material-ui/icons/Apps";
import Pagination from "@material-ui/lab/Pagination";
import CollectionItem from "./../components/CollectionItem";

const useStyles = makeStyles({
  introHeading: {
    textAlign: "center",
    fontWeight: "bold",
    marginTop: "0.5em",
    marginBottom: "1em",
    borderRadius: "5px",
    padding: "1em",
    backgroundImage: headingGradient,
  },
  subtitle: {
    marginBottom: "1em",
  },
  paragraph: {
    marginBottom: "1em",
  },
  contentHeading: {
    margin: "1em 0",
  },
  cardOuter: {
    padding: "1.5em 2.5em",
  },
  viewButton: {
    margin: "0.5em 0.5em 1em 0",
    padding: "8px 0",
    minWidth: 0,
    width: "42px",
    "& span": {
      margin: 0,
      padding: 0,
    },
    "& .MuiButton-label": {
      width: "12px",
    },
    "& .MuiTouchRipple-root": {
      display: "none",
    },
  },
  paginationContainer: {
    margin: "1em 0",
    textAlign: "center",
  },
  pagination: {
    display: "inline-block",
  },
});

const Collection: React.FC = () => {
  const classes = useStyles();

  return (
    <Box p="1.5em 0">
      <ThemeProvider theme={theme}>
        <Paper className={classes.cardOuter} elevation={0}>
          <Typography
            className={classes.introHeading}
            variant="h4"
            component="h1"
          >
            Your music/video collection
          </Typography>
          <Box>
            <Typography
              className={classes.subtitle}
              variant="h6"
              component="h2"
            >
              All your content listed from the most recent
            </Typography>
            <Typography>Change view</Typography>
            <Button
              className={classes.viewButton}
              variant="contained"
              size="large"
              startIcon={<FormatListBulletedIcon />}
            ></Button>
            <Button
              className={classes.viewButton}
              variant="contained"
              size="large"
              startIcon={<AppsIcon />}
            ></Button>
          </Box>
          <Box>
            <Grid container spacing={2}>
              <CollectionItem />
              <CollectionItem />
              <CollectionItem />
              <CollectionItem />
              <CollectionItem />
              <CollectionItem />
            </Grid>
          </Box>
          <div className={classes.paginationContainer}>
            <Pagination className={classes.pagination} count={4} size="small" />
          </div>
        </Paper>
      </ThemeProvider>
    </Box>
  );
};

export default Collection;
