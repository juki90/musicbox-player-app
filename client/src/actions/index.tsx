export const ADD_TO_COLLECTION_REQUEST = "ADD_TO_COLLECTION_REQUEST";
export const ADD_TO_COLLECTION_FAILED = "ADD_TO_COLLECTION_FAILED";
export const ADD_TO_COLLECTION_SUCCESS = "ADD_TO_COLLECTION_SUCCESS";

export const REMOVE_FROM_COLLECTION_REQUEST = "REMOVE_FROM_COLLECTION_REQUEST";
export const REMOVE_FROM_COLLECTION_FAILED = "REMOVE_FROM_COLLECTION_FAILED";
export const REMOVE_FROM_COLLECTION_SUCCESS = "REMOVE_FROM_COLLECTION_SUCCESS";

export const ADD_TO_PLAYLIST_REQUEST = "ADD_TO_PLAYLIST_REQUEST";
export const ADD_TO_PLAYLIST_FAILED = "ADD_TO_PLAYLIST_FAILED";
export const ADD_TO_PLAYLIST_SUCCESS = "ADD_TO_PLAYLIST_SUCCESS";

export const REMOVE_FROM_PLAYLIST_REQUEST = "REMOVE_FROM_PLAYLIST_REQUEST";
export const REMOVE_FROM_PLAYLIST_FAILED = "REMOVE_FROM_PLAYLIST_FAILED";
export const REMOVE_FROM_PLAYLIST_SUCCESS = "REMOVE_FROM_PLAYLIST_SUCCESS";

export const ADD_NEW_PLAYLIST_REQUEST = "ADD_NEW_PLAYLIST_REQUEST";
export const ADD_NEW_PLAYLIST_FAILED = "ADD_NEW_PLAYLIST_FAILED";
export const ADD_NEW_PLAYLIST_SUCCESS = "ADD_NEW_PLAYLIST_SUCCESS";

export const RENAME_PLAYLIST_REQUEST = "RENAME_PLAYLIST_REQUEST";
export const RENAME_PLAYLIST_FAILED = "RENAME_PLAYLIST_FAILED";
export const RENAME_PLAYLIST_SUCCESS = "RENAME_PLAYLIST_SUCCESS";

export const DELETE_PLAYLIST_REQUEST = "DELETE_PLAYLIST_REQUEST";
export const DELETE_PLAYLIST_FAILED = "DELETE_PLAYLIST_FAILED";
export const DELETE_PLAYLIST_SUCCESS = "DELETE_PLAYLIST_SUCCESS";

export const SORT_PLAYLIST_REQUEST = "SORT_PLAYLIST_REQUEST";
export const SORT_PLAYLIST_FAILED = "SORT_PLAYLIST_FAILED";
export const SORT_PLAYLIST_SUCCESS = "SORT_PLAYLIST_SUCCESS";

export const MOVE_IN_PLAYLIST_REQUEST = "MOVE_IN_PLAYLIST_REQUEST";
export const MOVE_IN_PLAYLIST_FAILED = "MOVE_IN_PLAYLIST_FAILED";
export const MOVE_IN_PLAYLIST_SUCCESS = "MOVE_IN_PLAYLIST_SUCCESS";

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

export const removeFromCollectionRequest: (id: number) => Action = (id) => {
  return {
    type: REMOVE_FROM_COLLECTION_REQUEST,
    payload: {
      id,
    },
  };
};
export const removeFromCollectionFailed: (text: string) => Action = (text) => {
  return {
    type: REMOVE_FROM_COLLECTION_FAILED,
    payload: {
      text,
    },
  };
};
export const removeFromCollectionSuccess: (id: number) => Action = (id) => {
  return {
    type: REMOVE_FROM_COLLECTION_SUCCESS,
    payload: {
      id,
    },
  };
};

export const addToPlaylistRequest: (id: number, item: Item) => Action = (
  id,
  item
) => {
  return {
    type: ADD_TO_PLAYLIST_REQUEST,
    payload: {
      id,
      item,
    },
  };
};
export const addToPlaylistFailed: (text: string) => Action = (text) => {
  return {
    type: ADD_TO_PLAYLIST_FAILED,
    payload: {
      text,
    },
  };
};
export const addToPlaylistSuccess: (id: number, item: Item) => Action = (
  id,
  item
) => {
  return {
    type: ADD_TO_PLAYLIST_SUCCESS,
    payload: {
      id,
      item,
    },
  };
};

export const removeFromPlaylistRequest: (
  id: number,
  vidId: number
) => Action = (id, vidId) => {
  return {
    type: REMOVE_FROM_PLAYLIST_REQUEST,
    payload: {
      id,
      vidId,
    },
  };
};
export const removeFromPlaylistFailed: (text: string) => Action = (text) => {
  return {
    type: REMOVE_FROM_PLAYLIST_FAILED,
    payload: {
      text,
    },
  };
};
export const removeFromPlaylistSuccess: (
  id: number,
  vidId: number
) => Action = (id, vidId) => {
  return {
    type: REMOVE_FROM_PLAYLIST_SUCCESS,
    payload: {
      id,
      vidId,
    },
  };
};

export const addNewPlaylistRequest: (name: string) => Action = (name) => {
  return {
    type: ADD_NEW_PLAYLIST_REQUEST,
    payload: {
      name,
    },
  };
};
export const addNewPlaylistFailed: (text: string) => Action = (text) => {
  return {
    type: ADD_NEW_PLAYLIST_FAILED,
    payload: {
      text,
    },
  };
};
export const addNewPlaylistSuccess: (name: string) => Action = (name) => {
  return {
    type: ADD_NEW_PLAYLIST_SUCCESS,
    payload: {
      name,
    },
  };
};

export const renamePlaylistRequest: (name: string, id: number) => Action = (
  name,
  id
) => {
  return {
    type: RENAME_PLAYLIST_REQUEST,
    payload: {
      name,
      id,
    },
  };
};
export const renamePlaylistFailed: (text: string) => Action = (text) => {
  return {
    type: RENAME_PLAYLIST_FAILED,
    payload: {
      text,
    },
  };
};
export const renamePlaylistSuccess: (name: string, id: number) => Action = (
  name,
  id
) => {
  return {
    type: RENAME_PLAYLIST_SUCCESS,
    payload: {
      name,
      id,
    },
  };
};

export const deletePlaylistRequest: (id: number) => Action = (id) => {
  return {
    type: DELETE_PLAYLIST_REQUEST,
    payload: {
      id,
    },
  };
};
export const deletePlaylistFailed: (text: string) => Action = (text) => {
  return {
    type: DELETE_PLAYLIST_FAILED,
    payload: {
      text,
    },
  };
};
export const deletePlaylistSuccess: (id: number) => Action = (id) => {
  return {
    type: DELETE_PLAYLIST_SUCCESS,
    payload: {
      id,
    },
  };
};

export const sortPlaylistRequest: (id: number, way: string) => Action = (
  id,
  way
) => {
  return {
    type: SORT_PLAYLIST_REQUEST,
    payload: {
      id,
      way,
    },
  };
};
export const sortPlaylistFailed: (text: string) => Action = (text) => {
  return {
    type: SORT_PLAYLIST_FAILED,
    payload: {
      text,
    },
  };
};
export const sortPlaylistSuccess: (id: number, way: string) => Action = (
  id,
  way
) => {
  return {
    type: SORT_PLAYLIST_SUCCESS,
    payload: {
      id,
      way,
    },
  };
};

export const moveInPlaylistRequest: (
  id: number,
  vidId: number,
  toVid: number
) => Action = (id, vidId, toVid) => {
  return {
    type: MOVE_IN_PLAYLIST_REQUEST,
    payload: {
      id,
      vidId,
      toVid,
    },
  };
};
export const moveInPlaylistFailed: (text: string) => Action = (text) => {
  return {
    type: MOVE_IN_PLAYLIST_FAILED,
    payload: {
      text,
    },
  };
};
export const moveInPlaylistSuccess: (
  id: number,
  vidId: number,
  toVid: number
) => Action = (id, vidId, toVid) => {
  return {
    type: MOVE_IN_PLAYLIST_SUCCESS,
    payload: {
      id,
      vidId,
      toVid,
    },
  };
};

export const playVideo: (
  vidId: number,
  plId?: number,
  fromSearch?: Item
) => Action = (vidId, plId?, fromSearch?) => {
  return {
    type: PLAY_VIDEO,
    payload: {
      vidId,
      plId,
      fromSearch,
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
  },
  onSuccess: () => void
) => Action = (name, email, password, data, onSuccess) => {
  return {
    type: REGISTER_REQUEST,
    payload: {
      name,
      email,
      password,
      data,
      onSuccess,
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

export const loginRequest: (
  email: string,
  password: string,
  onSuccess: () => void
) => Action = (email, password, onSuccess) => {
  return {
    type: LOGIN_REQUEST,
    payload: {
      email,
      password,
      onSuccess,
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
