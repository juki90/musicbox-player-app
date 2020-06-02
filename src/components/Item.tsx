import React from "react";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import blankVideo from "../assets/blank-video.jpg";
import { makeStyles, Typography, Button } from "@material-ui/core";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import AddIcon from "@material-ui/icons/Add";
import theme from "../styles/theme";
import UnfoldMoreIcon from "@material-ui/icons/UnfoldMore";

const useStyles = makeStyles({
  videoItem: (props: ItemProps) => {
    return props.type === "playlist"
      ? {
          display: "flex",
          alignItems: "top",
          flexDirection: "row",
          padding: "10px",
          "& img": {
            alignSelf: "center",
          },
          "& h6": {
            fontSize: "80%",
            wordBreak: "break-word",
          },
          [theme.breakpoints.up("sm")]: {
            "& h6": {
              fontSize: "100%",
            },
          },
          [theme.breakpoints.up("lg")]: {
            "& h6": {
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
    width: "100%",
    padding: "0 !important",
  },
  videoMiniature: {
    display: "flex",
    margin: "0 0 0.4em 0",
    padding: 0,
  },
  videoImageBig: {
    display: "block",
    height: "auto",
    maxWidth: "100%",
    minWidth: "246px",
    margin: "0 auto",
  },
  videoImageSmall: {
    display: "block",
    height: "auto",
    width: "100px",
  },
  videoInfo: {
    padding: "0 0 0 0.5em",
    flexDirection: "row",
  },
  videoButton: {
    margin: "0.5em 0.5em 0.5em 0",
  },
  videoButtonPlaylist: {
    padding: "5px 20px",
    width: "1em",
    minWidth: 0,
    margin: "0 2px 5px 2px",
    "& .MuiButton-startIcon": {
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
    margin: "0 auto",
    [theme.breakpoints.up("sm")]: {
      display: "flex",
      alignItems: "center",
      marginLeft: "auto",
      marginRight: "25px",
    },
  },
});

interface ItemProps {
  type: string;
  grid?: boolean;
}

const Item: React.FC<ItemProps> = (props) => {
  const { grid, type } = props;
  const classes = useStyles(props);
  return (
    <Grid item xs={12} sm={grid && 6} md={grid && 4} lg={grid && 3}>
      <Card className={classes.videoMiniature}>
        <CardContent className={classes.videoMiniatureContent}>
          <Box
            display="flex"
            className={grid ? classes.videoItemGrid : classes.videoItem}
          >
            <img
              className={
                type !== "playlist"
                  ? classes.videoImageBig
                  : classes.videoImageSmall
              }
              src={blankVideo}
              alt="Video miniature"
            />
            <Box
              display={type === "playlist" && "flex"}
              alignItems={type === "playlist" && "center"}
              className={classes.videoInfo}
            >
              <Typography variant="h6">
                Lorem ipsum - Dolor sit amet nesciunt sed repellendus
              </Typography>
              {type !== "playlist" && (
                <Typography variant="body1">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Cumque odio harum obcaecati. Nulla iure, nesciunt sed
                  repellendus tempore ab qui voluptatem obcaecati molestiae
                  dolore sequi alias et dolorum doloremque ...
                </Typography>
              )}
              {type === "collection" && (
                <>
                  <Button
                    className={classes.videoButton}
                    variant="contained"
                    color="primary"
                    size="small"
                    startIcon={<PlayArrowIcon />}
                  >
                    Play
                  </Button>
                  <Button
                    className={classes.videoButton}
                    variant="contained"
                    color="secondary"
                    size="small"
                    startIcon={<PlaylistAddIcon />}
                  >
                    Playlist
                  </Button>
                  <Button
                    className={`${classes.videoButton} ${classes.dangerButton}`}
                    variant="contained"
                    size="small"
                    startIcon={<DeleteForeverIcon />}
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
                    startIcon={<PlayArrowIcon />}
                  >
                    Play
                  </Button>
                  <Button
                    className={classes.videoButton}
                    variant="contained"
                    color="secondary"
                    size="small"
                    startIcon={<PlaylistAddIcon />}
                  >
                    Playlist
                  </Button>
                  <Button
                    className={classes.videoButton}
                    variant="contained"
                    color="secondary"
                    size="small"
                    startIcon={<AddIcon />}
                  >
                    Collection
                  </Button>
                </>
              )}
            </Box>
            {type === "playlist" && (
              <Box className={classes.playlistActions}>
                <Button
                  className={classes.videoButtonPlaylist}
                  variant="contained"
                  color="primary"
                  size="small"
                  startIcon={<UnfoldMoreIcon />}
                ></Button>
                <Button
                  className={`${classes.videoButtonPlaylist} ${classes.dangerButton}`}
                  variant="contained"
                  size="small"
                  startIcon={<DeleteForeverIcon />}
                ></Button>
              </Box>
            )}
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default Item;
