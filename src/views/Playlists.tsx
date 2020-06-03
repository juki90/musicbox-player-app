import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import { ThemeProvider, makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { theme } from "../styles/theme";
import Box from "@material-ui/core/Box";
import { useCommonStyles } from "./Root";
import { AppBar, Tabs, Tab, Button, Card } from "@material-ui/core";
import SinglePlaylist from "./../components/SinglePlaylist";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import SortByAlphaIcon from "@material-ui/icons/SortByAlpha";
import TitleIcon from "@material-ui/icons/Title";
import Item from "../components/Item";

const useStyles = makeStyles({
  selected: {
    "&.Mui-selected": {
      backgroundColor: theme.palette.secondary.main,
    },
  },
  newButton: {
    marginBottom: "1em",
  },
  dangerButton: {
    backgroundColor: "#f66",
    "&:hover": {
      backgroundColor: "#c55",
    },
  },
  actionButton: {
    marginRight: "0.5em",
    marginBottom: "0.5em",
  },
});

const Playlists: React.FC = () => {
  const classes = useStyles();
  const commonClasses = useCommonStyles();
  const [activeTab, setActiveTab] = useState<number>(0);
  const handleTabChange = (e: React.ChangeEvent<{}>, n: number) => {
    setActiveTab(n);
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
            Your playlists
          </Typography>
          <Button
            className={classes.newButton}
            variant="contained"
            color="primary"
            startIcon={<PlaylistAddIcon />}
          >
            Add new
          </Button>
          <AppBar position="static">
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              aria-label="playlist tabs"
              variant="scrollable"
              scrollButtons="auto"
            >
              <Tab className={classes.selected} value={0} label="ALL" />
              <Tab className={classes.selected} value={1} label="Item Two" />
              <Tab className={classes.selected} value={2} label="Item Three" />
              <Tab className={classes.selected} value={3} label="Item Four" />
            </Tabs>
          </AppBar>
          <AppBar position="static" color="default">
            <Box p="0.5em">
              <Button
                variant="contained"
                className={classes.actionButton}
                color="primary"
                startIcon={<PlayArrowIcon />}
                size="small"
              >
                Play
              </Button>
              <Button
                variant="contained"
                className={classes.actionButton}
                color="default"
                startIcon={<SortByAlphaIcon />}
                size="small"
              >
                Sort
              </Button>
              {activeTab > 0 && (
                <Button
                  variant="contained"
                  className={classes.actionButton}
                  color="default"
                  startIcon={<TitleIcon />}
                  size="small"
                >
                  Rename
                </Button>
              )}
              {activeTab > 0 && (
                <Button
                  variant="contained"
                  className={`${classes.dangerButton} ${classes.actionButton}`}
                  color="default"
                  startIcon={<DeleteForeverIcon />}
                  size="small"
                >
                  Delete
                </Button>
              )}
            </Box>
          </AppBar>
          <Card>
            <SinglePlaylist value={activeTab} index={0}></SinglePlaylist>
            <SinglePlaylist value={activeTab} index={1}>
              <Item
                added={new Date()}
                title="Ipsum dolor"
                desc="Lorem ipsum dolor sit amet"
                type="playlist"
              />
              <Item
                added={new Date()}
                title="Ipsum dolor"
                desc="Lorem ipsum dolor sit amet"
                type="playlist"
              />
            </SinglePlaylist>
            <SinglePlaylist value={activeTab} index={2}>
              <Item
                added={new Date()}
                title="Ipsum dolor"
                desc="Lorem ipsum dolor sit amet"
                type="playlist"
              />
              <Item
                added={new Date()}
                title="Ipsum dolor"
                desc="Lorem ipsum dolor sit amet"
                type="playlist"
              />
              <Item
                added={new Date()}
                title="Ipsum dolor"
                desc="Lorem ipsum dolor sit amet"
                type="playlist"
              />
            </SinglePlaylist>
            <SinglePlaylist value={activeTab} index={3}>
              <Item
                added={new Date()}
                title="Ipsum dolor"
                desc="Lorem ipsum dolor sit amet"
                type="playlist"
              />
              <Item
                added={new Date()}
                title="Ipsum dolor"
                desc="Lorem ipsum dolor sit amet"
                type="playlist"
              />
              <Item
                added={new Date()}
                title="Ipsum dolor"
                desc="Lorem ipsum dolor sit amet"
                type="playlist"
              />
              <Item
                added={new Date()}
                title="Ipsum dolor"
                desc="Lorem ipsum dolor sit amet"
                type="playlist"
              />
            </SinglePlaylist>
          </Card>
        </Paper>
      </ThemeProvider>
    </Box>
  );
};

export default Playlists;
