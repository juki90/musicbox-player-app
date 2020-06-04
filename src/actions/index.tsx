export const ADD_TO_COLLECTION = "ADD_TO_COLLECTION";
export const REMOVE_FROM_COLLECTION = "REMOVE_FROM_COLLECTION";
export const ADD_TO_PLAYLIST = "ADD_TO_PLAYLIST";
export const REMOVE_FROM_PLAYLIST = "REMOVE_FROM_PLAYLIST";
export const ADD_NEW_PLAYLIST = "ADD_NEW_PLAYLIST";
export const RENAME_PLAYLIST = "RENAME_PLAYLIST";
export const DELETE_PLAYLIST = "DELETE_PLAYLIST";
export const SORT_PLAYLIST = "SORT_PLAYLIST";

export const addToCollection: (item: Item) => { type: string; payload: any } = (
  item: Item
) => {
  return {
    type: ADD_TO_COLLECTION,
    payload: {
      item,
    },
  };
};

export const removeFromCollection: (
  link: string
) => { type: string; payload: any } = (link: string) => {
  return {
    type: REMOVE_FROM_COLLECTION,
    payload: {
      link,
    },
  };
};

export const addToPlaylist: (
  name: string,
  item: Item
) => { type: string; payload: any } = (name: string, item: Item) => {
  return {
    type: ADD_TO_PLAYLIST,
    payload: {
      name,
      item,
    },
  };
};

export const removeFromPlaylist: (
  id: number,
  link: string
) => { type: string; payload: any } = (id: number, link: string) => {
  return {
    type: REMOVE_FROM_PLAYLIST,
    payload: {
      id,
      link,
    },
  };
};

export const addNewPlaylist: (
  name: string
) => { type: string; payload: any } = (name: string) => {
  return {
    type: ADD_NEW_PLAYLIST,
    payload: {
      name,
    },
  };
};

export const renamePlaylist: (
  name: string,
  id: number
) => { type: string; payload: any } = (name: string, id: number) => {
  return {
    type: RENAME_PLAYLIST,
    payload: {
      name,
      id,
    },
  };
};

export const deletePlaylist: (id: number) => { type: string; payload: any } = (
  id: number
) => {
  return {
    type: DELETE_PLAYLIST,
    payload: {
      id,
    },
  };
};

export const sortPlaylist: (id: number) => { type: string; payload: any } = (
  id: number
) => {
  return {
    type: SORT_PLAYLIST,
    payload: {
      id,
    },
  };
};
