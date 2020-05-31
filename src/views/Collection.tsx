import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import { ThemeProvider, makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { theme } from "../styles/theme";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import AppsIcon from "@material-ui/icons/Apps";
import Pagination from "@material-ui/lab/Pagination";
import Item from "../components/Item";
import { useCommonStyles } from "./Root";
import { TextField } from "@material-ui/core";

const useStyles = makeStyles({
  searchButton: {
    margin: "0.5em 0 1em 0",
  },
});

const Collection: React.FC = () => {
  const commonClasses = useCommonStyles();
  const classes = useStyles();

  const [gridOn, setGridOn] = useState<boolean>(false);

  return (
    <Box p="1.5em 0">
      <ThemeProvider theme={theme}>
        <Paper className={commonClasses.cardOuter} elevation={0}>
          <Typography
            className={commonClasses.introHeading}
            variant="h4"
            component="h1"
          >
            Your music/video collection
          </Typography>
          <Box>
            <Typography>Search in collection:</Typography>
            <TextField
              id="search"
              className={classes.searchButton}
              label="Search"
            />
          </Box>
          <Box>
            <Typography
              className={commonClasses.subtitle}
              variant="h6"
              component="h2"
            >
              All your content listed from the most recent:
            </Typography>
            <Typography>Change view</Typography>
            <Button
              className={commonClasses.viewButton}
              variant="contained"
              size="large"
              color={!gridOn ? "primary" : "default"}
              startIcon={<FormatListBulletedIcon />}
              onClick={() => setGridOn(false)}
            ></Button>
            <Button
              className={commonClasses.viewButton}
              variant="contained"
              size="large"
              color={gridOn ? "primary" : "default"}
              startIcon={<AppsIcon />}
              onClick={() => setGridOn(true)}
            ></Button>
          </Box>
          <Box>
            <Grid container spacing={2}>
              <Item grid={gridOn} type="collection" />
              <Item grid={gridOn} type="collection" />
              <Item grid={gridOn} type="collection" />
              <Item grid={gridOn} type="collection" />
              <Item grid={gridOn} type="collection" />
              <Item grid={gridOn} type="collection" />
            </Grid>
          </Box>
          <div className={commonClasses.paginationContainer}>
            <Pagination
              className={commonClasses.pagination}
              count={4}
              size="small"
            />
          </div>
        </Paper>
      </ThemeProvider>
    </Box>
  );
};

export default Collection;
