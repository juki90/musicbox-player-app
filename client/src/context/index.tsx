import React from "react";

export const PlayerContext = React.createContext((on?: boolean) => {
  return;
});

export const MinimalizeContext = React.createContext({
  minimalize: (on?: boolean) => {
    return;
  },
  currently: false,
});
