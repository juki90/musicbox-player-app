import React from "react";

const PlayerContext = React.createContext(
  (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    return;
  }
);

export default PlayerContext;
