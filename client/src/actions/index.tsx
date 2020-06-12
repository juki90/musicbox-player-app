export const ADD_TO_COLLECTION = "ADD_TO_COLLECTION";
export const REMOVE_FROM_COLLECTION = "REMOVE_FROM_COLLECTION";
export const ADD_TO_PLAYLIST = "ADD_TO_PLAYLIST";
export const REMOVE_FROM_PLAYLIST = "REMOVE_FROM_PLAYLIST";
export const ADD_NEW_PLAYLIST = "ADD_NEW_PLAYLIST";
export const RENAME_PLAYLIST = "RENAME_PLAYLIST";
export const DELETE_PLAYLIST = "DELETE_PLAYLIST";
export const SORT_PLAYLIST = "SORT_PLAYLIST";
export const MOVE_IN_PLAYLIST = "MOVE_IN_PLAYLIST";
export const PLAY_VIDEO = "PLAY_VIDEO";
export const SKIP_TO_VIDEO = "SKIP_TO_VIDEO";

export const addToCollection: (item: Item) => Action = (item: Item) => {
  return {
    type: ADD_TO_COLLECTION,
    payload: {
      item,
    },
  };
};

export const removeFromCollection: (id: number) => Action = (id: number) => {
  return {
    type: REMOVE_FROM_COLLECTION,
    payload: {
      id,
    },
  };
};

export const addToPlaylist: (id: number, item: Item) => Action = (
  id: number,
  item: Item
) => {
  return {
    type: ADD_TO_PLAYLIST,
    payload: {
      id,
      item,
    },
  };
};

export const removeFromPlaylist: (id: number, vidId: number) => Action = (
  id: number,
  vidId: number
) => {
  return {
    type: REMOVE_FROM_PLAYLIST,
    payload: {
      id,
      vidId,
    },
  };
};

export const addNewPlaylist: (name: string) => Action = (name: string) => {
  return {
    type: ADD_NEW_PLAYLIST,
    payload: {
      name,
    },
  };
};

export const renamePlaylist: (name: string, id: number) => Action = (
  name: string,
  id: number
) => {
  return {
    type: RENAME_PLAYLIST,
    payload: {
      name,
      id,
    },
  };
};

export const deletePlaylist: (id: number) => Action = (id: number) => {
  return {
    type: DELETE_PLAYLIST,
    payload: {
      id,
    },
  };
};

export const sortPlaylist: (id: number, way: string) => Action = (
  id: number,
  way: string
) => {
  return {
    type: SORT_PLAYLIST,
    payload: {
      id,
      way,
    },
  };
};

export const moveInPlaylist: (
  id: number,
  vidId: number,
  toVid: number
) => Action = (id: number, vidId: number, toVid: number) => {
  return {
    type: MOVE_IN_PLAYLIST,
    payload: {
      id,
      vidId,
      toVid,
    },
  };
};

export const playVideo: (vidId: number, plId?: number) => Action = (
  vidId: number,
  plId?: number
) => {
  return {
    type: PLAY_VIDEO,
    payload: {
      vidId,
      plId,
    },
  };
};

export const skipToVideo: (skipTo: number, inPlaylist?: number) => Action = (
  skipTo: number,
  inPlaylist?: number
) => {
  return {
    type: SKIP_TO_VIDEO,
    payload: {
      skipTo,
      inPlaylist,
    },
  };
};
