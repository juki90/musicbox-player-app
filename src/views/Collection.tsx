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
import { connect } from "react-redux";
import prepeareToPagination from "../utils/prepeareToPagination";
import { removeFromCollection as removeFromCollectionAction } from "../actions";

const useStyles = makeStyles({
  searchButton: {
    margin: "0.5em 0 1em 0.5em",
  },
});

interface CollectionProps {
  collection: Item[];
  removeFromCollection: (link: string) => void;
}

const Collection: React.FC<CollectionProps> = ({
  collection,
  removeFromCollection,
}) => {
  const commonClasses = useCommonStyles();
  const classes = useStyles();
  const [gridOn, setGridOn] = useState<boolean>(false);

  const [paginationOn, setPaginationOn] = useState<number>(0);
  const prepearedResults = prepeareToPagination(collection);

  const displayItems =
    prepearedResults.pages === 1
      ? prepearedResults.results.map((r: Item) => (
          <Item
            key={`i-col-${r.id}`}
            grid={gridOn}
            type="collection"
            title={r.title}
            desc={r.desc}
            link={r.link}
            added={r.added}
            onRemove={(e) => removeFromCollection(r.link!)}
          />
        ))
      : prepearedResults.results.map((p: any) => {
          const page = p.map((r: Item) => (
            <Item
              key={`i-col-${r.id}`}
              grid={gridOn}
              type="collection"
              title={r.title}
              desc={r.desc}
              link={r.link}
              added={r.added}
              onRemove={(e) => removeFromCollection(r.link!)}
            />
          ));
          return page;
        });

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
              {prepearedResults.pages > 1
                ? displayItems[paginationOn]
                : displayItems}
              {displayItems.length === 0 && (
                <Typography>No music or videos in collection yet</Typography>
              )}
            </Grid>
          </Box>
          {prepearedResults.pages > 1 && (
            <div className={commonClasses.paginationContainer}>
              <Pagination
                className={commonClasses.pagination}
                page={paginationOn}
                onChange={(e, p) => setPaginationOn(p - 1)}
                defaultPage={0}
                count={prepearedResults.pages}
                size="small"
              />
            </div>
          )}
        </Paper>
      </ThemeProvider>
    </Box>
  );
};

const mapStateToProps = (state: StateProps) => {
  const { collection } = state;
  return {
    collection,
  };
};

const mapDispatchToProps = (
  dispatch: (arg0: { type: string; payload: any }) => any
) => ({
  removeFromCollection: (link: string) =>
    dispatch(removeFromCollectionAction(link)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Collection);
