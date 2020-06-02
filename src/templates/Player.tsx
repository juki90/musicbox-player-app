import React from "react";
import Box from "@material-ui/core/Box";
import {
  makeStyles,
  IconButton,
  Grid,
  AppBar,
  Tabs,
  Tab,
  Divider,
} from "@material-ui/core";
import defaultVideoImg from "../assets/blank-video.jpg";
import theme from "../styles/theme";
import Slider from "@material-ui/core/Slider";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import PauseCircleFilledIcon from "@material-ui/icons/PauseCircleFilled";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import VolumeOffIcon from "@material-ui/icons/VolumeOff";
import VolumeUp from "@material-ui/icons/VolumeUp";
import CancelIcon from "@material-ui/icons/Cancel";
import SinglePlaylist from "../components/SinglePlaylist";
import Item from "./../components/Item";
import { ThemeProvider } from "@material-ui/core/styles";

const useStyles = makeStyles({
  player: {
    position: "fixed",
    top: "60px",
    left: 0,
    width: "100%",
    height: "100vh",
    overflowY: "scroll",
    zIndex: 999,
  },
  videoBox: {
    backgroundColor: "#121212",
  },
  videoContainer: {
    position: "relative",
    padding: "1em 0",
    width: "100%",
  },
  video: {
    display: "block",
    margin: "0 auto",
    height: "auto",
    [theme.breakpoints.up("sm")]: {
      width: "480px",
    },
  },
  videoPanelContainer: {
    color: theme.palette.primary.main,
    padding: "5 0 0 0",
  },
  videoPanel: {
    minHeight: "80vh",
    backgroundColor: "rgba(20, 20, 25, 0.95)",
  },
  controlButtons: {
    textAlign: "center",
    margin: "0 auto",
    padding: "1em 0",
    width: "300px",
  },
  controlBtn: {
    display: "inline-block",
  },
  sliderProgress: {
    marginLeft: "1em",
  },
  tabs: {
    width: "100%",
    backgroundColor: "#fff",
    margin: "0 auto 1em auto",
    padding: 0,
  },
  playlistPanel: {
    padding: "1em",
    backgroundColor: "#b2b2b2",
  },
  exitBtn: {
    position: "absolute",
    top: "0.14em",
    right: "0.14em",
    color: "#c2c2c2",
  },
});

const Player: React.FC = () => {
  const classes = useStyles();

  const [volume, setVolume] = React.useState<number>(30);

  const [tab, setTab] = React.useState(0);

  const handleVolumeChange = (e: any, newValue: number | number[]) => {
    setVolume(newValue as number);
  };

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTab(newValue);
  };

  return (
    <Box className={classes.player}>
      <ThemeProvider theme={theme}>
        <Box className={classes.videoBox}>
          <Container className={classes.videoContainer}>
            <img
              className={classes.video}
              src={defaultVideoImg}
              alt="Default video"
            />
            <IconButton aria-label="delete" className={classes.exitBtn}>
              <CancelIcon fontSize="large" />
            </IconButton>
          </Container>
        </Box>
        <Box pt="1em" className={classes.videoPanel}>
          <Container className={classes.videoPanelContainer}>
            <Box display="flex">
              <Typography>5:23</Typography>
              <Slider
                className={classes.sliderProgress}
                defaultValue={0}
                aria-labelledby="progress time bar"
                step={1}
                min={0}
                max={300}
                valueLabelDisplay="auto"
                valueLabelFormat={(x) => {
                  return x > 59
                    ? `${Math.floor(x / 60)}:${
                        x % 60 < 9 ? `0${x % 60}` : x % 60
                      }`
                    : `0:${x < 9 ? `0${x}` : x}`;
                }}
              />
            </Box>
            <Box className={classes.controlButtons}>
              <IconButton
                color="primary"
                className={classes.controlBtn}
                aria-label="go to previous video or music"
              >
                <SkipPreviousIcon fontSize="large" />
              </IconButton>

              <IconButton
                color="primary"
                className={classes.controlBtn}
                aria-label="play"
              >
                <PlayCircleFilledIcon fontSize="large" />
              </IconButton>
              <IconButton
                color="primary"
                className={classes.controlBtn}
                aria-label="pause"
              >
                <PauseCircleFilledIcon fontSize="large" />
              </IconButton>
              <IconButton
                color="primary"
                className={classes.controlBtn}
                aria-label="go to next video or music"
              >
                <SkipNextIcon fontSize="large" />
              </IconButton>
              <Grid container spacing={2}>
                <Grid item>
                  <VolumeUp color="primary" />
                  <VolumeOffIcon color="primary" />
                </Grid>
                <Grid item xs>
                  <Slider
                    value={volume}
                    onChange={handleVolumeChange}
                    aria-labelledby="volume slider"
                  />
                </Grid>
              </Grid>
            </Box>
            <Box className={classes.playlistPanel}>
              <AppBar className={classes.tabs} position="static">
                <Tabs
                  value={tab}
                  onChange={handleTabChange}
                  indicatorColor="primary"
                  textColor="primary"
                  variant="scrollable"
                  scrollButtons="auto"
                  aria-label="scrollable auto tabs example"
                >
                  <Tab label="Collection" />
                  <Divider />
                  <Tab label="Item Two" />
                  <Tab label="Item Three" />
                  <Tab label="Item Four" />
                </Tabs>
              </AppBar>
              <Box p="0" width="100%">
                <SinglePlaylist value={tab} index={0}>
                  <Item type="playlist" />
                </SinglePlaylist>
                <SinglePlaylist value={tab} index={1}>
                  <Item type="playlist" />
                  <Item type="playlist" />
                </SinglePlaylist>
                <SinglePlaylist value={tab} index={2}>
                  <Item type="playlist" />
                  <Item type="playlist" />
                  <Item type="playlist" />
                </SinglePlaylist>
                <SinglePlaylist value={tab} index={3}>
                  <Item type="playlist" />
                  <Item type="playlist" />
                  <Item type="playlist" />
                  <Item type="playlist" />
                </SinglePlaylist>
              </Box>
            </Box>
          </Container>
        </Box>
      </ThemeProvider>
    </Box>
  );
};

export default Player;
