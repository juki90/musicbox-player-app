import React, { useState } from "react";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Item from "./../components/Item";
import { Typography, Button, makeStyles } from "@material-ui/core";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import AppsIcon from "@material-ui/icons/Apps";
import Pagination from "@material-ui/lab/Pagination";
import { useCommonStyles } from "../views/Root";
import classes from "*.module.css";
import theme from "../styles/theme";

const useStyles = makeStyles({
  viewOptions: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
});

const SearchResults: React.FC = () => {
  const classes = useStyles();
  const commonClasses = useCommonStyles();
  const [gridOn, setGridOn] = useState<boolean>(false);
  return (
    <Box>
      <Box className={classes.viewOptions}>
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
      <Grid container spacing={2}>
        <Item grid={gridOn} type="search-result" />
        <Item grid={gridOn} type="search-result" />
        <Item grid={gridOn} type="search-result" />
        <Item grid={gridOn} type="search-result" />
      </Grid>
      <div className={commonClasses.paginationContainer}>
        <Pagination
          className={commonClasses.pagination}
          count={4}
          size="small"
        />
      </div>
    </Box>
  );
};

export default SearchResults;
