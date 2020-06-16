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
  loggedAs: string | undefined;
  message: {
    error: string;
    message: string;
  };
};

// ACTIONS

type addToCollectionAction = {
  type: string;
  payload: {
    item: Item;
  };
};

type removeFromCollectionAction = {
  type: string;
  payload: {
    id: number;
  };
};

type addToPlaylistAction = {
  type: string;
  payload: {
    id: number;
    item: Item;
  };
};

type removeFromPlaylistAction = {
  type: string;
  payload: {
    id: number;
    vidId: number;
  };
};

type addNewPlaylistAction = {
  type: string;
  payload: {
    name: string;
  };
};

type renamePlaylistAction = {
  type: string;
  payload: {
    name: string;
    id: number;
  };
};

type deletePlaylistAction = {
  type: string;
  payload: {
    id: number;
  };
};

type sortPlaylistAction = {
  type: string;
  payload: {
    id: number;
    way: string;
  };
};

type moveInPlaylistAction = {
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
  | addToPlaylistAction
  | removeFromPlaylistAction
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
