import React from "react";
import { Box } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

interface SinglePlaylistProps {
  index: number;
  value: number;
}

const SinglePlaylist: React.FC<SinglePlaylistProps> = ({
  index,
  value,
  children,
}) => {
  if (value === index) {
    return (
      <Box p="0">
        {children ? (
          children
        ) : (
          <Typography variant="body1">No tracks in this playlist</Typography>
        )}
      </Box>
    );
  }
  return null;
};

export default SinglePlaylist;
