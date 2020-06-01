import React from "react";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  player: {
    position: "fixed",
    bottom: 0,
    left: 0,
  },
});

const Player: React.FC = () => {
  const classes = useStyles();
  return <Box className={classes.player}>Player</Box>;
};

export default Player;
