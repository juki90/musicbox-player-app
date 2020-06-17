export const ADD_TO_COLLECTION_REQUEST = "ADD_TO_COLLECTION_REQUEST";
export const ADD_TO_COLLECTION_FAILED = "ADD_TO_COLLECTION_FAILED";
export const ADD_TO_COLLECTION_SUCCESS = "ADD_TO_COLLECTION_SUCCESS";

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

export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILED = "REGISTER_FAILED";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILED = "LOGIN_FAILED";

export const REMOVE_NOTIFICATION = "REMOVE_NOTIFICATION";

export const LOGOUT = "LOGOUT";

export const addToCollectionRequest: (item: Item) => Action = (item) => {
  return {
    type: ADD_TO_COLLECTION_REQUEST,
    payload: {
      item,
    },
  };
};
export const addToCollectionFailed: (text: string) => Action = (text) => {
  return {
    type: ADD_TO_COLLECTION_FAILED,
    payload: {
      text,
    },
  };
};
export const addToCollectionSuccess: (item: Item) => Action = (item) => {
  return {
    type: ADD_TO_COLLECTION_SUCCESS,
    payload: {
      item,
    },
  };
};

export const removeFromCollection: (id: number) => Action = (id) => {
  return {
    type: REMOVE_FROM_COLLECTION,
    payload: {
      id,
    },
  };
};

export const addToPlaylist: (id: number, item: Item) => Action = (id, item) => {
  return {
    type: ADD_TO_PLAYLIST,
    payload: {
      id,
      item,
    },
  };
};

export const removeFromPlaylist: (id: number, vidId: number) => Action = (
  id,
  vidId
) => {
  return {
    type: REMOVE_FROM_PLAYLIST,
    payload: {
      id,
      vidId,
    },
  };
};

export const addNewPlaylist: (name: string) => Action = (name) => {
  return {
    type: ADD_NEW_PLAYLIST,
    payload: {
      name,
    },
  };
};

export const renamePlaylist: (name: string, id: number) => Action = (
  name,
  id
) => {
  return {
    type: RENAME_PLAYLIST,
    payload: {
      name,
      id,
    },
  };
};

export const deletePlaylist: (id: number) => Action = (id) => {
  return {
    type: DELETE_PLAYLIST,
    payload: {
      id,
    },
  };
};

export const sortPlaylist: (id: number, way: string) => Action = (id, way) => {
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
) => Action = (id, vidId, toVid) => {
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
  vidId,
  plId?
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
  skipTo,
  inPlaylist?
) => {
  return {
    type: SKIP_TO_VIDEO,
    payload: {
      skipTo,
      inPlaylist,
    },
  };
};

export const registerRequest: (
  name: string,
  email: string,
  password: string,
  data: {
    playlists: Playlist[];
    collection: Item[];
  }
) => Action = (name, email, password, data) => {
  return {
    type: REGISTER_REQUEST,
    payload: {
      name,
      email,
      password,
      data,
    },
  };
};

export const registerSuccess: (
  text: string,
  name: string,
  token: string
) => Action = (text, name, token) => {
  return {
    type: REGISTER_SUCCESS,
    payload: {
      text,
      name,
      token,
    },
  };
};

export const registerFailed: (text: string) => Action = (text) => {
  return {
    type: REGISTER_FAILED,
    payload: {
      text,
    },
  };
};

export const removeNotification: () => Action = () => {
  return {
    type: REMOVE_NOTIFICATION,
  };
};

export const loginRequest: (email: string, password: string) => Action = (
  email,
  password
) => {
  return {
    type: LOGIN_REQUEST,
    payload: {
      email,
      password,
    },
  };
};

export const loginSuccess: (
  text: string,
  loggedAs: string,
  collection: Item[],
  playlists: Playlist[]
) => Action = (text, loggedAs, collection, playlists) => {
  return {
    type: LOGIN_SUCCESS,
    payload: {
      text,
      loggedAs,
      collection,
      playlists,
    },
  };
};

export const loginFailed: (text: string) => Action = (text) => {
  return {
    type: LOGIN_FAILED,
    payload: {
      text,
    },
  };
};

export const logout: () => { type: string } = () => {
  return {
    type: LOGOUT,
  };
};
