declare module "react-router-dom";

type Item = {
  id: number;
  added: Date;
  link: string;
  title: string;
  desc: string;
  playing?: boolean;
  fromPlaylist?: number;
};

type Playlist = {
  id: number;
  items: Item[];
  name: string;
};

type StateProps = {
  collection: Item[];
  playlists: Playlist[];
  inPlayer: Item | undefined;
  loggedAs: string;
  message: {
    error: string;
    message: string;
  };
};

// ACTIONS

type addToCollectionRequestAction = {
  type: string;
  payload: {
    item: Item;
  };
};
type addToCollectionFailedAction = {
  type: string;
  payload: {
    item: Item;
  };
};
type addToCollectionSuccessAction = {
  type: string;
  payload: {
    item: Item;
  };
};

type removeFromCollectionRequestAction = {
  type: string;
  payload: {
    id: number;
  };
};
type removeFromCollectionFailedAction = {
  type: string;
  payload: {
    text: string;
  };
};
type removeFromCollectionSuccessAction = {
  type: string;
  payload: {
    id: number;
  };
};

type addToPlaylistRequestAction = {
  type: string;
  payload: {
    id: number;
    item: Item;
  };
};
type addToPlaylistFailedAction = {
  type: string;
  payload: {
    text: string;
  };
};
type addToPlaylistSuccessAction = {
  type: string;
  payload: {
    id: number;
    item: Item;
  };
};

type removeFromPlaylistRequestAction = {
  type: string;
  payload: {
    id: number;
    vidId: number;
  };
};
type removeFromPlaylistFailedAction = {
  type: string;
  payload: {
    text: string;
  };
};
type removeFromPlaylistSuccessAction = {
  type: string;
  payload: {
    id: number;
    vidId: number;
  };
};

type addNewPlaylistRequestAction = {
  type: string;
  payload: {
    name: string;
  };
};
type addNewPlaylistFailedAction = {
  type: string;
  payload: {
    text: string;
  };
};
type addNewPlaylistSuccessAction = {
  type: string;
  payload: {
    name: string;
  };
};

type renamePlaylistRequestAction = {
  type: string;
  payload: {
    name: string;
    id: number;
  };
};
type renamePlaylistFailedAction = {
  type: string;
  payload: {
    text: string;
  };
};
type renamePlaylistSuccessAction = {
  type: string;
  payload: {
    name: string;
    id: number;
  };
};

type deletePlaylistRequestAction = {
  type: string;
  payload: {
    id: number;
  };
};
type deletePlaylistFailedAction = {
  type: string;
  payload: {
    text: string;
  };
};
type deletePlaylistSuccessAction = {
  type: string;
  payload: {
    id: number;
  };
};

type sortPlaylistRequestAction = {
  type: string;
  payload: {
    id: number;
    way: string;
  };
};
type sortPlaylistFailedAction = {
  type: string;
  payload: {
    text: string;
  };
};
type sortPlaylistSuccessAction = {
  type: string;
  payload: {
    id: number;
    way: string;
  };
};

type moveInPlaylistRequestAction = {
  type: string;
  payload: {
    id: number;
    vidId: number;
    toVid: number;
  };
};
type moveInPlaylistFailedAction = {
  type: string;
  payload: {
    text: string;
  };
};
type moveInPlaylistSuccessAction = {
  type: string;
  payload: {
    id: number;
    vidId: number;
    toVid: number;
  };
};

type playVideoAction = {
  type: string;
  payload: {
    vidId: number;
    plId?: number;
    fromSearch?: Item;
  };
};

type skipToVideoAction = {
  type: string;
  payload: {
    skipTo: number;
    inPlaylist?: number;
  };
};

type registerRequestAction = {
  type: string;
  payload: {
    name: string;
    email: string;
    password: string;
    data: {
      playlists: Playlist[];
      collection: Item[];
    };
  };
};

type registerSuccessAction = {
  type: string;
  payload: {
    text: string;
    name: string;
  };
};

type registerFailedAction = {
  type: string;
  payload: {
    text: string;
  };
};

type removeNotificationAction = {
  type: string;
};

type loginRequestAction = {
  type: string;
  payload: {
    email: string;
    password: string;
  };
};

type loginSuccessAction = {
  type: string;
  payload: {
    text: string;
    loggedAs: string;
    collection: Item[];
    playlists: Playlist[];
  };
};

type loginFailedAction = {
  type: string;
  payload: {
    text: string;
  };
};

type Action =
  | addToCollectionAction
  | removeFromCollectionAction
  | addToPlaylistRequestAction
  | addToPlaylistFailedAction
  | addToPlaylistSuccessAction
  | removeFromPlaylistRequestAction
  | removeFromPlaylistFailedAction
  | removeFromPlaylistSuccessAction
  | addNewPlaylistAction
  | deletePlaylistAction
  | sortPlaylistAction
  | moveInPlaylistAction
  | playVideoAction
  | skipToVideoAction
  | registerRequestAction
  | registerSuccessAction
  | registerFailedAction
  | removeNotificationAction
  | loginRequestAction
  | loginSuccessAction
  | loginFailedAction
  | AnyAction;
