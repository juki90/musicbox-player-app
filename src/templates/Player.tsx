/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, {
  useEffect,
  SetStateAction,
  useState,
  useRef,
  ChangeEvent,
} from "react";
import {
  makeStyles,
  IconButton,
  Grid,
  AppBar,
  Tabs,
  Tab,
  Box,
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
  skipToVideo as skipToVideoAction,
} from "../actions";
import ReactPlayer from "react-player";

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
    "& img": {
      width: "100%",
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
  volumeIcon: {
    cursor: "pointer",
  },
});

let mutedVolume: number;

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
  skipToVideo: (skipTO: number, inPlaylist?: number) => void;
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
    skipToVideo,
  } = props;
  const classes = useStyles(props);
  const [playing, setPlaying] = useState<boolean>(true);
  const [volume, setVolume] = useState<number>(30);
  const [tab, setTab] = useState<number>(0);
  const [progress, goToProgress] = useState<number>(0);
  const thePlayer = useRef<ReactPlayer>(new ReactPlayer({}));
  useEffect(() => {
    if (playing) {
      goToProgress(0);
    }
  }, [inPlayer]);

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
    },
    handleSkipToVideo = (dir: number) => {
      console.log(dir, inPlayer);
      if (inPlayer === undefined) {
        return;
      }
      if (dir < 0 && inPlayer.id !== 0 && inPlayer.fromPlaylist! >= 0) {
        skipToVideo(dir, inPlayer!.fromPlaylist);
        return;
      }
      if (
        dir > 0 &&
        inPlayer.fromPlaylist! >= 0 &&
        inPlayer.id !== playlists[inPlayer.fromPlaylist!].items.length - 1
      ) {
        skipToVideo(dir, inPlayer!.fromPlaylist);
        return;
      }
      if (
        dir > 0 &&
        inPlayer.id !== collection.length - 1 &&
        inPlayer.fromPlaylist === undefined
      ) {
        skipToVideo(dir);
      }
      if (dir < 0 && inPlayer.id !== 0 && inPlayer.fromPlaylist === undefined) {
        skipToVideo(dir);
      }
    },
    playButton = () => {
      if (playing) {
        goToProgress(0);
        setPlaying(false);
        return;
      }
      setPlaying(true);
    },
    // eslint-disable-next-line @typescript-eslint/ban-types
    handleSeekTo: (e: ChangeEvent<{}>, v: number | number[]) => void = (
      e,
      v
    ) => {
      if (thePlayer.current) {
        goToProgress(v as number);
        thePlayer.current.seekTo(v as number, "seconds");
      }
    },
    handleVolumeMute = () => {
      if (volume) {
        mutedVolume = volume;
        setVolume(0);
        return;
      }
      setVolume(mutedVolume);
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
            <Box className={classes.video}>
              {inPlayer ? (
                <ReactPlayer
                  url={inPlayer.link}
                  playing={playing}
                  width={minimalized ? "120px" : "480px"}
                  height={minimalized ? "68px" : "273px"}
                  volume={volume / 100}
                  controls={false}
                  ref={thePlayer}
                  onProgress={(obj) => {
                    goToProgress(Math.floor(obj.playedSeconds));
                  }}
                  onPlay={() => setPlaying(true)}
                  onPause={() => setPlaying(false)}
                />
              ) : (
                <img src={defaultVideoImg} alt="Blank video" />
              )}
            </Box>
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
                <Typography>
                  {progress > 59
                    ? `${Math.floor(progress / 60)}:${
                        progress % 60 < 10 ? `0${progress % 60}` : progress % 60
                      }`
                    : `0:${progress < 10 ? `0${progress}` : progress}`}
                </Typography>
                <Slider
                  className={classes.sliderProgress}
                  defaultValue={0}
                  aria-labelledby="progress time bar"
                  step={1}
                  min={0}
                  max={thePlayer.current ? thePlayer.current.getDuration() : 0}
                  value={progress}
                  valueLabelDisplay="auto"
                  onChange={handleSeekTo}
                  valueLabelFormat={(x) => {
                    return x > 59
                      ? `${Math.floor(x / 60)}:${
                          x % 60 < 10 ? `0${x % 60}` : x % 60
                        }`
                      : `0:${x < 10 ? `0${x}` : x}`;
                  }}
                />
              </Box>
            )}
            <Box className={classes.controlButtons}>
              <IconButton
                color="primary"
                disabled={
                  (inPlayer && inPlayer.id === 0) || inPlayer === undefined
                }
                className={classes.controlBtn}
                aria-label="go to previous video or track"
                onClick={() => handleSkipToVideo(-1)}
              >
                <SkipPreviousIcon fontSize="large" />
              </IconButton>

              {playing && (
                <IconButton
                  color="primary"
                  disabled={!inPlayer}
                  className={classes.controlBtn}
                  aria-label="play"
                  onClick={playButton}
                >
                  <PlayCircleFilledIcon fontSize="large" />
                </IconButton>
              )}
              {!playing && (
                <IconButton
                  color="primary"
                  disabled={!inPlayer}
                  className={classes.controlBtn}
                  aria-label="pause"
                  onClick={playButton}
                >
                  <PauseCircleFilledIcon fontSize="large" />
                </IconButton>
              )}
              <IconButton
                color="primary"
                disabled={
                  (inPlayer &&
                    (inPlayer.fromPlaylist! >= 0
                      ? playlists[inPlayer.fromPlaylist!].items.length - 1 ===
                        inPlayer.id
                      : collection.length - 1 === inPlayer.id!)) ||
                  inPlayer === undefined
                }
                onClick={() => handleSkipToVideo(1)}
                className={classes.controlBtn}
                aria-label="go to next video or track"
              >
                <SkipNextIcon fontSize="large" />
              </IconButton>
              <Grid container spacing={2}>
                <Grid item>
                  {!!volume && (
                    <VolumeUp
                      className={classes.volumeIcon}
                      color="primary"
                      onClick={handleVolumeMute}
                    />
                  )}
                  {!volume && (
                    <VolumeOffIcon
                      className={classes.volumeIcon}
                      color="primary"
                      onClick={handleVolumeMute}
                    />
                  )}
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
  skipToVideo: (skipTO: number, inPlaylist?: number) =>
    dispatch(skipToVideoAction(skipTO, inPlaylist)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Player);
