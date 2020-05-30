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

const useStyles = makeStyles({
  videoMiniature: {
    display: "flex",
    margin: "0.25em",
  },
  videoImage: {
    display: "block",
    height: "auto",
    maxWidth: "100%",
    minWidth: "246px",
    margin: "0 auto",
  },
  videoInfo: {
    padding: "0 1em",
    "& h6": {
      fontWeight: "bold",
    },
  },
  videoButton: {
    margin: "0.5em 0.5em 0.5em 0",
  },
  dangerButton: {
    backgroundColor: "#f66",
    "&:hover": {
      backgroundColor: "#c55",
    },
  },
});

const CollectionItem: React.FC = () => {
  const classes = useStyles();
  return (
    <Grid item xs={12}>
      <Card className={classes.videoMiniature}>
        <CardContent>
          <Box display="flex" alignItems="top">
            <img
              className={classes.videoImage}
              src={blankVideo}
              alt="Video miniature"
            />
            <Box display="block" className={classes.videoInfo}>
              <Typography variant="h6">Lorem ipsum - Dolor sit amet</Typography>
              <Typography variant="body1">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Blanditiis eos impedit molestias praesentium maxime illum
                aliquid dignissimos saepe quae commodi....
              </Typography>
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
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default CollectionItem;
