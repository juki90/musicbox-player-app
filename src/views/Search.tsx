import React from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Box, TextField } from "@material-ui/core";
import theme from "../styles/theme";
import Grid, { GridSpacing } from "@material-ui/core/Grid";

const useStyles = makeStyles({
  introHeading: {
    textAlign: "center",
    fontWeight: "bold",
    marginTop: "1em",
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
  input: {
    marginBottom: "1em",
  },
});

const Home: React.FC = () => {
  const classes = useStyles();
  return (
    <Box p="1.5em 0">
      <ThemeProvider theme={theme}>
        <Paper className={classes.cardOuter} elevation={0}>
          <Typography
            className={classes.introHeading}
            variant="h5"
            component="h1"
          >
            Search music and videos:
          </Typography>

          <Typography className={classes.paragraph} variant="body1">
            Switch between website you want to search from and other options
          </Typography>
          <form noValidate autoComplete="off">
            <TextField
              className={classes.input}
              id="keywords"
              label="Enter keywords"
              variant="outlined"
            />
            <Typography variant="body1">Website to search in: </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="body1">Website to search in: </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1">Sent before: </Typography>
                <Typography variant="body1">Length: </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1">Sort by: </Typography>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </ThemeProvider>
    </Box>
  );
};

export default Home;
