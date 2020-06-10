/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useEffect, SetStateAction } from "react";
import Box from "@material-ui/core/Box";
import {
  makeStyles,
  IconButton,
  Grid,
  AppBar,
  Tabs,
  Tab,
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
import CloseIcon from "@material-ui/icons/Close";
import MinimizeIcon from "@material-ui/icons/Minimize";
import { ThemeProvider } from "@material-ui/core/styles";
import { connect } from "react-redux";
import ItemList from "../components/ItemList";
import {
  removeFromCollection as removeFromCollectionAction,
  removeFromPlaylist as removeFromPlaylistAction,
  playVideo as playVideoAction,
} from "../actions";

const useStyles = makeStyles({
  player: (props: PlayerProps) => {
    return props.minimalized
      ? {
          position: "fixed",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "80px",
          paddingRight: "50px",
          backgroundColor: "#121212",
          zIndex: 999,
        }
      : {
          position: "fixed",
          top: "60px",
          left: 0,
          width: "100%",
          height: "100vh",
          overflowY: "scroll",
          zIndex: 999,
        };
  },
  videoBox: {
    backgroundColor: "#121212",
  },
  videoContainer: {
    position: "relative",
    padding: "0.5em 0",
    alignItems: "center",
    display: (props: PlayerProps) => {
      return props.minimalized ? "flex" : "block";
    },
  },
  videoTitle: {
    textAlign: "left",
    color: "#ffffff",
    fontWeight: "bold",
    paddingLeft: "1em",
    fontSize: (props: PlayerProps) => {
      return props.minimalized ? "0.8em" : "1.3em";
    },
    [theme.breakpoints.up("md")]: {
      textAlign: "center",
      fontSize: (props: PlayerProps) => {
        return props.minimalized ? "1em" : "1.5em";
      },
    },
  },
  videoDesc: {
    display: (props: PlayerProps) => {
      return props.minimalized ? "none" : "block";
    },
    color: "#eeeeee",
    padding: "1em 0",
  },
  video: {
    display: "block",
    alignSelf: "center",
    height: "auto",
    margin: (props: PlayerProps) => {
      return props.minimalized ? "0 0.5em" : "1em auto 2em auto";
    },
    width: (props: PlayerProps) => {
      return props.minimalized ? "120px" : "240px";
    },
    [theme.breakpoints.up("sm")]: {
      width: (props: PlayerProps) => {
        return props.minimalized ? "120px" : "480px";
      },
    },
  },
  videoPanelContainer: {
    position: "relative",
    color: theme.palette.primary.main,
    padding: "5px 10px 0 10px",
  },
  videoPanel: (props: PlayerProps) => {
    return props.minimalized
      ? {
          position: "absolute",
          top: 0,
          left: 0,
          paddingLeft: "8em",
          paddingRight: "50px",
          paddingTop: 0,
        }
      : {
          minHeight: "80vh",
          backgroundColor: "rgba(20, 30, 35, 1)",
          paddingBottom: "80px",
        };
  },
  controlButtons: {
    display: (props: PlayerProps) => {
      return props.minimalized ? "none" : "block";
    },
    textAlign: "center",
    margin: "0 auto",
    padding: "1em 0",
    width: "300px",
    "& .Mui-disabled": {
      color: theme.palette.primary.main,
      opacity: "0.4",
    },
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
  playlistPanel: (props: PlayerProps) => {
    return props.minimalized
      ? { display: "none" }
      : {
          padding: "1em 1em 3em 1em",
          overflowY: "visible",
          backgroundColor: "#b2b2b2",
        };
  },
  playerBtns: {
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    top: "5px",
    right: "15px",
    zIndex: 9999999,
    "& button": {
      color: "#fcfcfc",
      padding: "5px",
      borderRadius: "5px",
      backgroundColor: "rgba(20, 20, 20, 0.75)",
      marginBottom: "4px",
    },
  },
  videoPanelInfo: (props: PlayerProps) => {
    return props.minimalized
      ? {
          "& h6": {
            fontSize: "1.25em",
            textAlign: "left",
            padding: "0.5em 2.5em 0.5em 0.5em",
            color: "#fff",
            [theme.breakpoints.up("lg")]: {
              fontSize: "1.5em",
            },
          },
        }
      : {
          padding: "1em",
          backgroundColor: "#dfdfdf",
          "& h6": {
            color: "#000",
          },
          "& p": {
            color: "#000",
          },
        };
  },
});

interface PlayerProps {
  minimalized: boolean;
  playlists: Playlist[];
  collection: Item[];
  inPlayer: Item | undefined;
  minimalize: React.Dispatch<React.SetStateAction<boolean>>;
  close: () => void;
  removeFromCollection: (link: string) => void;
  removeFromPlaylist: (id: number, link: string) => void;
  playVideo: (vidId: number, plId?: number) => void;
  setPlayerOn: (on: boolean) => void;
}

const Player: React.FC<PlayerProps> = (props) => {
  const {
    minimalized,
    playlists,
    collection,
    inPlayer,
    close,
    minimalize,
    removeFromCollection,
    removeFromPlaylist,
    playVideo,
    setPlayerOn,
  } = props;
  const classes = useStyles(props);

  const [volume, setVolume] = React.useState<number>(30),
    [tab, setTab] = React.useState(0);

  const handleVolumeChange = (e: unknown, newValue: number | number[]) => {
      setVolume(newValue as number);
    },
    handleTabChange = (event: React.ChangeEvent<unknown>, newValue: number) => {
      setTab(newValue);
    },
    handleClosePlayer = () => {
      const element = document.querySelector("#main-body")!;
      element.classList.remove("scroll-lock");
      playVideo(-1);
      close();
    },
    handleMinimalizePlayer = (on?: boolean) => {
      const element = document.querySelector("#main-body")!;
      if (on) {
        element.classList.remove("scroll-lock");
        minimalize(true);
        return;
      }
      element.classList.add("scroll-lock");
      minimalize(false);
    };

  const videoTitle = (
    <Typography className={classes.videoTitle} variant="h6">
      Lorem ipsum dolor - sit amet consectetur adipisicing...
    </Typography>
  );

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
            {minimalized && <Box pr="3em">{videoTitle}</Box>}
            <Box className={classes.playerBtns}>
              <IconButton aria-label="close" onClick={handleClosePlayer}>
                <CloseIcon />
              </IconButton>
              <IconButton
                aria-label="minimalize"
                onClick={() => handleMinimalizePlayer(!minimalized)}
              >
                <MinimizeIcon />
              </IconButton>
            </Box>
          </Container>
        </Box>
        <Box pt="1em" className={classes.videoPanel}>
          <Container className={classes.videoPanelContainer}>
            {!minimalized && (
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
            )}
            <Box className={classes.controlButtons}>
              <IconButton
                color="default"
                disabled={true}
                className={classes.controlBtn}
                aria-label="go to previous video or track"
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
                aria-label="go to next video or track"
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
            {!minimalized && (
              <Box className={classes.videoPanelInfo}>
                {videoTitle}
                <Typography variant="body1" className={classes.videoDesc}>
                  Lorem ipsum dolor - sit amet consectetur adipisicing. Lorem
                  ipsum dolor sit amet, consectetur adipisicing elit.
                  Praesentium molestias atque, asperiores laboriosam nobis ex
                  cupiditate nulla dolorem facere veniam?.
                </Typography>
              </Box>
            )}
            <Box className={classes.playlistPanel}>
              <AppBar className={classes.tabs} position="static">
                <Tabs
                  value={tab}
                  onChange={handleTabChange}
                  indicatorColor="primary"
                  textColor="primary"
                  variant="scrollable"
                  scrollButtons="on"
                  aria-label="scrollable auto tabs example"
                >
                  <Tab label="Collection" />
                  {playlists.map((p: Playlist) => (
                    <Tab key={`player-t-${p.id}`} label={p.name} />
                  ))}
                </Tabs>
              </AppBar>
              <Box p="0" width="100%">
                <ItemList
                  fromItems={tab > 0 ? playlists[tab - 1].items : collection}
                  activeTab={tab}
                  itemsPerPage={10}
                  type="player"
                  rmCollection={removeFromCollection}
                  rmPlaylist={removeFromPlaylist}
                />
              </Box>
            </Box>
          </Container>
        </Box>
      </ThemeProvider>
    </Box>
  );
};

const mapStateToProps = (state: StateProps) => {
  const { collection, playlists, inPlayer } = state;
  return {
    collection,
    playlists,
    inPlayer,
  };
};
const mapDispatchToProps = (dispatch: (arg0: Action) => unknown) => ({
  removeFromCollection: (link: string) =>
    dispatch(removeFromCollectionAction(link)),
  removeFromPlaylist: (id: number, link: string) =>
    dispatch(removeFromPlaylistAction(id, link)),
  playVideo: (vidId: number, plId?: number) =>
    dispatch(playVideoAction(vidId, plId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Player);
