import React, { useState } from "react";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Item from "./../components/Item";
import { Typography, Button, makeStyles } from "@material-ui/core";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import AppsIcon from "@material-ui/icons/Apps";
import Pagination from "@material-ui/lab/Pagination";
import { useCommonStyles } from "../views/Root";
import theme from "../styles/theme";
import { connect } from "react-redux";
import prepeareToPagination from "../utils/prepeareToPagination";
import { addToCollectionRequest as addToCollectionRequestAction } from "../actions";

const useStyles = makeStyles({
  viewOptions: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
});

interface SearchResultsProps {
  collection: Item[];
  searched: Item[];
  addToCollectionRequest: (item: Item) => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({
  collection,
  searched,
  addToCollectionRequest,
}) => {
  const classes = useStyles();
  const commonClasses = useCommonStyles();
  const [gridOn, setGridOn] = useState<boolean>(false);
  const [paginationOn, setPaginationOn] = useState<number>(1);

  const prepearedResults = prepeareToPagination(searched, 10);

  const handleIsInCollection = (link: string) => {
    return collection.some((i) => {
      return i.link === link;
    });
  };

  const displayItems =
    prepearedResults.pages === 1
      ? (prepearedResults.results as Item[]).map((r: Item) => {
          const collected = handleIsInCollection(r.link);
          return (
            <Item
              key={`i-sr-${r.id}`}
              link={r.link}
              grid={gridOn}
              type="search-result"
              title={r.title}
              desc={r.desc}
              added={r.added}
              inCollection={collected}
              num={r.id}
              inTab={-1}
              playing={r.playing as boolean}
              onAdd={() =>
                addToCollectionRequest({
                  id: r.id,
                  title: r.title,
                  desc: r.desc,
                  link: r.link,
                  added: new Date(),
                })
              }
            />
          );
        })
      : (prepearedResults.results as Item[][]).map((p: Item[]) => {
          const page = p.map((r: Item) => {
            const collected = handleIsInCollection(r.link);
            return (
              <Item
                key={`i-sr-${r.id}`}
                grid={gridOn}
                type="search-result"
                title={r.title}
                desc={r.desc}
                link={r.link}
                added={r.added}
                inCollection={collected}
                num={r.id}
                inTab={-1}
                playing={r.playing as boolean}
                onAdd={() =>
                  addToCollectionRequest({
                    id: r.id,
                    title: r.title,
                    desc: r.desc,
                    link: r.link,
                    added: new Date(),
                  })
                }
              />
            );
          });
          return page;
        });

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
        >
          {" "}
        </Button>
        <Button
          className={commonClasses.viewButton}
          variant="contained"
          size="large"
          color={gridOn ? "primary" : "default"}
          startIcon={<AppsIcon />}
          onClick={() => setGridOn(true)}
        >
          {" "}
        </Button>
      </Box>
      <Grid container spacing={2}>
        {prepearedResults.pages > 1
          ? displayItems[paginationOn - 1]
          : displayItems}
      </Grid>
      {prepearedResults.pages > 1 && (
        <div className={commonClasses.paginationContainer}>
          <Pagination
            variant="outlined"
            shape="rounded"
            page={paginationOn}
            onChange={(e, p) => setPaginationOn(p)}
            defaultPage={0}
            count={prepearedResults.pages}
            size="small"
            hideNextButton={true}
            hidePrevButton={true}
          />
        </div>
      )}
    </Box>
  );
};

const mapStateToProps = (state: StateProps) => {
  const { collection } = state;
  return { collection };
};

const mapDispatchToProps = (dispatch: (arg0: any) => any) => ({
  addToCollectionRequest: (item: Item) =>
    dispatch(addToCollectionRequestAction(item)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);
