import React, { useState, useEffect } from "react";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import blankVideo from "../assets/blank-video.jpg";
import {
  makeStyles,
  Typography,
  Button,
  Menu,
  MenuItem,
} from "@material-ui/core";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import AddIcon from "@material-ui/icons/Add";
import theme from "../styles/theme";
import UnfoldMoreIcon from "@material-ui/icons/UnfoldMore";
import CheckIcon from "@material-ui/icons/Check";
import StopIcon from "@material-ui/icons/Stop";
import { connect } from "react-redux";
import {
  addToPlaylistRequest as addToPlaylistRequestAction,
  playVideo as playVideoAction,
} from "../actions";

const useStyles = makeStyles({
  videoItem: (props: ItemProps) => {
    return props.type === "playlist" || props.type === "player"
      ? {
          display: "flex",
          alignItems: "top",
          flexDirection: "row",
          padding: "10px",
          "& img": {
            alignSelf: "center",
            flexShrink: 0,
          },
          "& h6": {
            fontSize: "80%",
            wordBreak: "break-word",
            [theme.breakpoints.up("sm")]: {
              fontSize: "100%",
            },
            [theme.breakpoints.up("lg")]: {
              fontSize: "120%",
            },
          },
        }
      : {
          display: "flex",
          alignItems: "top",
          flexDirection: "column",
          padding: "10px",
          "& img": {
            alignSelf: "center",
          },
          [theme.breakpoints.up("sm")]: {
            flexDirection: "row",
          },
        };
  },
  videoItemGrid: {
    display: "flex",
    alignItems: "top",
    flexDirection: "column",
    padding: "10px",
  },
  videoMiniatureContent: {
    position: "relative",
    zIndex: 10,
    width: "100%",
    padding: "0 !important",
    "&:hover": {
      cursor: (props) => {
        return props.type === "player" ? "pointer" : "normal";
      },
      backgroundImage: (props) => {
        return props.type === "player"
          ? "linear-gradient(90deg, rgba(186,251,255,0) 0%, rgba(133,234,255,1) 50%, rgba(152,238,255,0) 100%)"
          : "none";
      },
    },
  },

  videoMiniature: {
    position: "relative",
    margin: "0 0 0.4em 0",
    padding: 0,
    zIndex: 9,
    "&:before": {
      content: "''",
      position: "absolute",
      top: 0,
      left: "-100%",
      display: "block",
      width: "200%",
      height: "100%",
      zIndex: 9,
      backgroundSize: "100%",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "left center",
      animation: (props) => {
        return props.playing ? "slideLeftRight 1s infinite alternate" : "none";
      },
      backgroundImage: (props) => {
        return props.playing
          ? "linear-gradient(90deg, rgba(186,251,255,0) 0%, rgba(133,234,255,1) 50%, rgba(152,238,255,0) 100%)"
          : "none";
      },
    },
  },
  videoImage: {
    display: "block",
    height: "auto",
    minWidth: (props) => {
      return props.type !== "playlist" && props.type !== "player"
        ? "240px"
        : "90px";
    },
    width: (props) => {
      return props.type !== "playlist" && props.type !== "player"
        ? "240px"
        : "90px";
    },
    alignSelf: "center",
    cursor: "pointer",
    textAlign: "center",
    "& img": {
      width: "100%",
    },
    [theme.breakpoints.up("md")]: {
      minWidth: (props) => {
        return props.type !== "playlist" && props.type !== "player"
          ? "280px"
          : "110px";
      },
      width: (props) => {
        return props.type !== "playlist" && props.type !== "player"
          ? "280px"
          : "140px";
      },
    },
  },
  videoInfo: {
    padding: "0.5em",
    flexDirection: "row",
    "& h6": {
      fontWeight: "bold",
    },
    "& p": {
      padding: "0.5em 0 1.25em 0",
    },
    "& button": {
      margin: "0 10px 10px 0",
    },
    [theme.breakpoints.up("sm")]: {
      padding: " 0 0 0 1em",
    },
  },
  videoButton: {
    margin: "0.5em 0.5em 0.5em 0",
  },
  videoButtonPlaylist: {
    padding: "5px 20px",
    width: "1em",
    minWidth: 0,
    margin: "0 2px 5px 2px",
    "& span": {
      padding: 0,
      margin: 0,
    },
  },
  dangerButton: {
    backgroundColor: "#f66",
    "&:hover": {
      backgroundColor: "#c55",
    },
  },
  playlistActions: {
    padding: "0 0.25em",
    width: "40px",
    marginLeft: "auto",
    [theme.breakpoints.up("sm")]: {
      alignItems: "center",
      marginLeft: "auto",
      marginRight: "25px",
    },
  },
  caption: {
    display: "block",
    textAlign: "center",
    marginBottom: "0.5em",
    [theme.breakpoints.up("md")]: {
      padding: "0 !important",
      marginLeft: "1em",
      textAlign: (props: ItemProps) => {
        return props.grid ? "center" : "left";
      },
    },
  },
});

interface ItemProps {
  type: string;
  added: Date;
  title: string;
  desc: string;
  grid?: boolean;
  link: string;
  playlists: Playlist[];
  inCollection?: boolean;
  num: number;
  inTab: number;
  playing: boolean;
  inPlayer: Item | undefined;
  onRemove?:
    | ((e: React.MouseEvent<HTMLButtonElement>) => void)
    | ((id: number) => void)
    | (() => void);
  addToPlaylistRequest: (id: number, item: Item) => void;
  onMove?: (
    e: React.MouseEvent<HTMLElement> | React.TouchEvent<HTMLButtonElement>
  ) => void;
  onAdd?: () => void;
  playVideo: (vidId: number, plId?: number, fromSearch?: Item) => void;
}

const Item: React.FC<ItemProps & React.HTMLAttributes<HTMLDivElement>> = (
  props
) => {
  const {
    grid,
    type,
    title,
    desc,
    added,
    inCollection,
    playlists,
    link,
    num,
    inTab,
    playing,
    inPlayer,
    onRemove,
    addToPlaylistRequest,
    onMove,
    onAdd,
    playVideo,
  } = props;

  const addedAt = new Date(added);

  const classes = useStyles(props);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClickPlaylistAdd = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAddToPlaylist = (id: number, item: Item) => {
    setAnchorEl(null);
    addToPlaylistRequest(id, item);
  };

  const getVideoThumbnail = (link: string) => {
    const regexes = {
      yt: /https:\/\/www\.youtube\.com\/watch\?v=/,
      vim: /https:\/\/vimeo\.com\//,
      sc: /https:\/\/soundcloud\.com\//,
    };
    if (regexes.yt.test(link)) {
      return `https://img.youtube.com/vi/${link.replace(
        regexes.yt,
        ""
      )}/mqdefault.jpg`;
    }
    if (regexes.vim.test(link)) {
      return `https://i.vimeocdn.com/video/${link.replace(
        regexes.vim,
        ""
      )}_295x166.jpg`;
    }
    if (regexes.sc.test(link)) {
      return blankVideo;
    }
  };

  const handlePlayVideo = () => {
    if (
      type === "search-result" &&
      (!inPlayer || (inPlayer && inPlayer.link !== link))
    ) {
      playVideo(-1, -1, {
        title,
        desc,
        link,
        added: new Date(),
        id: -1,
      });
      return;
    }
    if (type === "search-result" && inPlayer && inPlayer.link === link) {
      playVideo(-1);
      return;
    }
    if (playing) {
      playVideo(-1);
      return;
    }
    if (inTab === 0) {
      playVideo(num);
      return;
    }
    playVideo(num, inTab - 1);
  };

  const playlistMenuItems = playlists.map((p: Playlist) => (
    <MenuItem
      key={`mi-${p.id}`}
      onClick={() =>
        handleAddToPlaylist(p.id, {
          id: 0,
          title,
          desc,
          link,
          added: added ? added : new Date(),
        })
      }
    >
      {p.name}
    </MenuItem>
  ));

  return (
    <Grid
      item
      xs={12}
      sm={grid && 6}
      md={grid && 4}
      lg={grid && 3}
      data-num={num}
      data-type={type === "playlist" ? "item" : null}
    >
      <Card className={classes.videoMiniature}>
        <CardContent
          className={classes.videoMiniatureContent}
          onClick={type === "player" ? handlePlayVideo : undefined}
        >
          <Box className={grid ? classes.videoItemGrid : classes.videoItem}>
            <Box className={classes.videoImage}>
              <img
                src={getVideoThumbnail(link)}
                onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                  e.currentTarget.src = blankVideo;
                }}
                alt="Video miniature"
              />
            </Box>
            <Box
              display={
                type === "playlist" || type === "player" ? "flex" : "block"
              }
              alignItems={
                type === "playlist" || type === "player" ? "center" : "top"
              }
              className={classes.videoInfo}
            >
              <Typography data-testid="item-title" variant="h6">
                {title.length > 100 ? `${title.slice(0, 100)}...` : title}

                {playing && (type === "playlist" || type === "player") && (
                  <>
                    <br />
                    (NOW PLAYING)
                  </>
                )}
              </Typography>
              {type !== "playlist" && type !== "player" && (
                <Typography variant="body1" data-testid="item-description">
                  {desc.length > 250 ? `${desc.slice(0, 250)}...` : desc}
                </Typography>
              )}
              {type === "collection" && (
                <>
                  <Button
                    className={classes.videoButton}
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={handlePlayVideo}
                    startIcon={playing ? <StopIcon /> : <PlayArrowIcon />}
                    data-testid="collection-play-button"
                  >
                    {playing ? "Stop" : "Play"}
                  </Button>
                  <Button
                    className={classes.videoButton}
                    variant="contained"
                    color="secondary"
                    size="small"
                    onClick={handleClickPlaylistAdd}
                    startIcon={<PlaylistAddIcon />}
                    data-testid="collection-playlist-button"
                  >
                    Playlist
                  </Button>
                  <Button
                    className={`${classes.videoButton} ${classes.dangerButton}`}
                    variant="contained"
                    size="small"
                    startIcon={<DeleteForeverIcon />}
                    onClick={() => (onRemove as (id: number) => void)(num)}
                    data-testid="collection-remove-button"
                  >
                    Remove
                  </Button>
                </>
              )}
              {type === "search-result" && (
                <>
                  <Button
                    className={classes.videoButton}
                    variant="contained"
                    color="primary"
                    size="small"
                    startIcon={
                      inPlayer && inPlayer.link === link ? (
                        <StopIcon />
                      ) : (
                        <PlayArrowIcon />
                      )
                    }
                    onClick={handlePlayVideo}
                    data-testid="search-play-button"
                  >
                    {inPlayer && inPlayer.link === link ? "Stop" : "Play"}
                  </Button>
                  <Button
                    className={classes.videoButton}
                    variant="contained"
                    color="secondary"
                    size="small"
                    startIcon={<PlaylistAddIcon />}
                    onClick={handleClickPlaylistAdd}
                    data-testid="search-playlist-button"
                  >
                    Playlist
                  </Button>
                  <Button
                    className={classes.videoButton}
                    variant="contained"
                    color={inCollection ? "default" : "secondary"}
                    size="small"
                    startIcon={inCollection ? <CheckIcon /> : <AddIcon />}
                    disabled={inCollection}
                    onClick={onAdd}
                    data-testid="search-collection-button"
                  >
                    {inCollection ? "In collection" : "Collection"}
                  </Button>
                </>
              )}
            </Box>
            {inTab !== undefined && inTab > 0 && type === "playlist" && (
              <Box className={classes.playlistActions}>
                <Button
                  className={classes.videoButtonPlaylist}
                  variant="contained"
                  color="default"
                  size="small"
                  startIcon={<UnfoldMoreIcon />}
                  onMouseDown={onMove}
                  onTouchStart={onMove}
                  data-num={num}
                  data-testid="playlist-move-button"
                >
                  {" "}
                </Button>
                <Button
                  className={`${classes.videoButtonPlaylist} ${classes.dangerButton}`}
                  variant="contained"
                  size="small"
                  startIcon={<DeleteForeverIcon />}
                  onClick={onRemove as () => void}
                  data-testid="playlist-remove-button"
                >
                  {" "}
                </Button>
              </Box>
            )}
            {(type === "collection" || type === "search-result") && (
              <Menu
                id="playlist-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                {playlistMenuItems}
                {!playlistMenuItems.length && (
                  <Box p="0 1em">
                    <Typography>
                      You must create your first playlist!
                    </Typography>
                  </Box>
                )}
              </Menu>
            )}
          </Box>
          {type !== "playlist" &&
            type !== "player" &&
            type !== "search-result" && (
              <Typography
                className={classes.caption}
                variant="caption"
                component="small"
              >
                <b>Added at:</b>
                {` ${addedAt?.getDate()} ${addedAt?.toLocaleString("en", {
                  month: "long",
                })} ${addedAt?.getFullYear()} `}
                {`- ${addedAt?.getHours()}:${
                  addedAt?.getMinutes() < 9
                    ? `0${addedAt?.getMinutes()}`
                    : addedAt?.getMinutes()
                }`}
              </Typography>
            )}
        </CardContent>
      </Card>
    </Grid>
  );
};

const mapStateToProps = (state: StateProps) => {
  const { playlists, inPlayer } = state;
  return {
    playlists,
    inPlayer,
  };
};

const mapDispatchToProps = (dispatch: (arg0: Action) => unknown) => ({
  addToPlaylistRequest: (id: number, item: Item) =>
    dispatch(addToPlaylistRequestAction(id, item)),
  playVideo: (vidId: number, plId?: number, fromSearch?: Item) =>
    dispatch(playVideoAction(vidId, plId, fromSearch)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Item);
