import React, { useState, useRef } from "react";
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
import axios from "axios";

const useStyles = makeStyles({
  filterBtn: {
    padding: "5px 15px 5px 15px",
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
  errorText: {
    display: "block",
    color: "#f22",
  },
});

const Search: React.FC = () => {
  const commonClasses = useCommonStyles();
  const classes = useStyles();
  const [filtersOn, setFiltersOn] = useState<boolean>(false);
  const [websites, setWebsites] = useState<string[]>(["youtube"]);
  const [searchString, setSearchString] = useState<string>("");
  const [sentBefore, setSentBefore] = useState<number>(0);
  const [sentBeforeForAPI, setSentBeforeForAPI] = useState<string>("");
  const [isShort, setIsShort] = useState<boolean>(true);
  const [searched, setSearched] = useState<Item[]>([]);
  const [searchError, setSearchError] = useState<string>("");
  const searchBtn = useRef<HTMLButtonElement | null>(null);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.getAttribute("name")!;
    if (websites.includes(name)) {
      setWebsites(websites.filter((w) => w !== name));
      return;
    }
    setWebsites([name, ...websites]);
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const minus = +e.target.value;
    if (minus) {
      const date = new Date(
        new Date().setDate(new Date().getDate() - minus)
      ).toISOString();
      setSentBefore(minus);
      setSentBeforeForAPI(date);
      return;
    }
    setSentBefore(0);
    setSentBeforeForAPI("");
  };

  const handleSearchButton = () => {
    if (!searchString) {
      return;
    }
    const results = axios
      .post("/api/search", {
        searchString,
        options: {
          websites,
          sentBefore: sentBeforeForAPI,
          isShort,
        },
      })
      .then((res) => res.data.items)
      .then((data) => setSearched(data))
      .catch((err) =>
        setSearchError("An error occured fetching links from server")
      );
  };

  const handleEnterPress = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      searchBtn.current!.click();
    }
  };

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
            <Box display="flex" alignItems="center">
              <TextField
                className={classes.searchInput}
                id="keywords"
                label="Enter keywords"
                variant="outlined"
                value={searchString}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSearchString(e.currentTarget.value)
                }
                onFocus={() =>
                  document.addEventListener("keypress", handleEnterPress)
                }
                onBlur={() =>
                  document.removeEventListener("keypress", handleEnterPress)
                }
              />
              <Button
                className={classes.searchBtn}
                variant="contained"
                color="primary"
                startIcon={<SearchIcon />}
                onClick={handleSearchButton}
                ref={searchBtn}
              >
                Search
              </Button>
            </Box>
            {searchError && (
              <Typography variant="body2" className={classes.errorText}>
                {searchError}
              </Typography>
            )}
            <Box pt="1em">
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
                                checked={websites.includes("youtube")}
                                onChange={handleCheckboxChange}
                                name="youtube"
                              />
                            }
                            label="Youtube"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={websites.includes("vimeo")}
                                onChange={handleCheckboxChange}
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
                          value={sentBefore}
                          onChange={handleRadioChange}
                        >
                          <FormControlLabel
                            value={0}
                            control={<Radio />}
                            label="Any"
                          />
                          <FormControlLabel
                            value={1}
                            control={<Radio />}
                            label="1 day"
                          />
                          <FormControlLabel
                            value={7}
                            control={<Radio />}
                            label="1 week"
                          />
                          <FormControlLabel
                            value={31}
                            control={<Radio />}
                            label="1 month"
                          />
                          <FormControlLabel
                            value={365}
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
                          value={isShort}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setIsShort(e.target.value === "true" ? true : false)
                          }
                        >
                          <FormControlLabel
                            value={true}
                            control={<Radio />}
                            label="Short"
                          />
                          <FormControlLabel
                            value={false}
                            control={<Radio />}
                            label="Medium"
                          />
                        </RadioGroup>
                      </FormControl>
                    </Grid>
                  </Grid>
                </>
              )}
            </Box>
          </form>
          <SearchResults searched={searched} />
        </Paper>
      </ThemeProvider>
    </Box>
  );
};

export default Search;
