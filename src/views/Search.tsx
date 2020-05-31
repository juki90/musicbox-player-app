import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import {
  Box,
  TextField,
  FormControlLabel,
  Checkbox,
  FormControl,
  FormGroup,
  FormLabel,
  Radio,
  RadioGroup,
} from "@material-ui/core";
import { theme } from "../styles/theme";
import Grid from "@material-ui/core/Grid";
import FilterListIcon from "@material-ui/icons/FilterList";
import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";
import SearchResults from "../templates/SearchResults";
import { useCommonStyles } from "./Root";

const useStyles = makeStyles({
  filterBtn: {
    padding: "10px 15px 5px 15px",
    margin: "10px 0 20px 0",
  },
  filterLabel: {
    margin: "10px 0",
  },
  searchInput: {
    "& input": {
      height: "38px",
      padding: "0 15px",
    },
    "& label": {
      fontSize: "0.9em",
      transform: "translate(14px, 11px) scale(1)",
      "&.MuiInputLabel-shrink": {
        transform: "translate(18px, -6px) scale(0.75)",
      },
    },
  },
  searchBtn: {
    margin: "1em 0 1em 1em",
    padding: "5px 15px",
    "& .MuiButton-label": {
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
    },
  },
  searchLabel: {
    display: "flex",
    alignItems: "space-between",
  },
});

const Home: React.FC = () => {
  const commonClasses = useCommonStyles();
  const classes = useStyles();
  const [filtersOn, setFiltersOn] = useState<boolean>(false);
  return (
    <Box p="1.5em 0">
      <ThemeProvider theme={theme}>
        <Paper className={commonClasses.cardOuter} elevation={0}>
          <Typography
            className={commonClasses.introHeading}
            variant="h4"
            component="h1"
          >
            Search music and videos
          </Typography>
          <form noValidate autoComplete="off">
            <Typography className={commonClasses.paragraph} variant="body1">
              Keywords to search:
            </Typography>
            <Box mb="1em" display="flex" alignItems="center">
              <TextField
                className={classes.searchInput}
                id="keywords"
                label="Enter keywords"
                variant="outlined"
              />
              <Button
                className={classes.searchBtn}
                variant="contained"
                color="primary"
                startIcon={<SearchIcon />}
              >
                Search
              </Button>
            </Box>
            <Typography variant="body1">Use filters:</Typography>
            <Button
              className={classes.filterBtn}
              variant="contained"
              onClick={() => setFiltersOn(!filtersOn)}
            >
              <FilterListIcon />
              Filters
            </Button>
            {filtersOn && (
              <>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6} lg={3}>
                    <FormControl component="fieldset">
                      <FormLabel
                        className={classes.filterLabel}
                        component="legend"
                      >
                        Website to search in:
                      </FormLabel>
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={false}
                              onChange={() => console.log("form")}
                              name="soundcloud"
                            />
                          }
                          label="Soundcloud"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={false}
                              onChange={() => console.log("form")}
                              name="youtube"
                            />
                          }
                          label="Youtube"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={false}
                              onChange={() => console.log("form")}
                              name="vimeo"
                            />
                          }
                          label="Vimeo"
                        />
                      </FormGroup>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={6} lg={3}>
                    <FormControl component="fieldset">
                      <FormLabel
                        className={classes.filterLabel}
                        component="legend"
                      >
                        Sent before
                      </FormLabel>
                      <RadioGroup
                        aria-label="sent-before"
                        name="sent-before"
                        value={null}
                        onChange={() => console.log("form")}
                      >
                        <FormControlLabel
                          value="sentAny"
                          control={<Radio />}
                          label="Any"
                        />
                        <FormControlLabel
                          value="1day"
                          control={<Radio />}
                          label="1 day"
                        />
                        <FormControlLabel
                          value="1week"
                          control={<Radio />}
                          label="1 week"
                        />
                        <FormControlLabel
                          value="1month"
                          control={<Radio />}
                          label="1 month"
                        />
                        <FormControlLabel
                          value="1year"
                          control={<Radio />}
                          label="1 year"
                        />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={6} lg={3}>
                    <FormControl component="fieldset">
                      <FormLabel
                        className={classes.filterLabel}
                        component="legend"
                      >
                        Length
                      </FormLabel>
                      <RadioGroup
                        aria-label="length"
                        name="length"
                        value={null}
                        onChange={() => console.log("form")}
                      >
                        <FormControlLabel
                          value="short"
                          control={<Radio />}
                          label="Short"
                        />
                        <FormControlLabel
                          value="long"
                          control={<Radio />}
                          label="Long"
                        />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                </Grid>
              </>
            )}
          </form>
          <SearchResults />
        </Paper>
      </ThemeProvider>
    </Box>
  );
};

export default Home;
