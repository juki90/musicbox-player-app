import React from "react";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import SearchResult from "./../components/SearchResult";
import { Typography, Button, makeStyles } from "@material-ui/core";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import AppsIcon from "@material-ui/icons/Apps";
import Pagination from "@material-ui/lab/Pagination";

const useStyles = makeStyles({
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

const SearchResults: React.FC = () => {
  const classes = useStyles();
  return (
    <Box>
      <Box>
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
      <Grid container spacing={2}>
        <SearchResult />
        <SearchResult />
        <SearchResult />
        <SearchResult />
      </Grid>
      <div className={classes.paginationContainer}>
        <Pagination className={classes.pagination} count={4} size="small" />
      </div>
    </Box>
  );
};

export default SearchResults;
