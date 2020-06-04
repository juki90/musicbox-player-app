import {
  ADD_TO_COLLECTION,
  REMOVE_FROM_COLLECTION,
  ADD_TO_PLAYLIST,
  REMOVE_FROM_PLAYLIST,
  ADD_NEW_PLAYLIST,
  RENAME_PLAYLIST,
  DELETE_PLAYLIST,
  SORT_PLAYLIST,
} from "../actions";

const initialState: StateProps = {
  collection: [],
  playlists: [
    {
      id: 0,
      items: [],
      name: "First playlist",
    },
    {
      id: 1,
      items: [],
      name: "Second playlist",
    },
  ],
};

function rootReducer(state: StateProps = initialState, action: any) {
  switch (action.type) {
    case ADD_TO_COLLECTION:
      let withAddedToCollection = [
        action.payload.item,
        ...state.collection,
      ].sort((a: Item, b: Item) => {
        return b.added.getTime() - a.added.getTime();
      });
      withAddedToCollection = withAddedToCollection.map(
        (c: Item, i: number) => {
          const cl = c;
          cl.id = i;
          return cl;
        }
      );
      return {
        ...state,
        collection: withAddedToCollection,
      };
    case REMOVE_FROM_COLLECTION:
      let withRemovedCollection = [...state.collection].filter((e) => {
        return e.link !== action.payload.link;
      });

      withRemovedCollection = withRemovedCollection.map(
        (c: Item, i: number) => {
          const cl = c;
          cl.id = i;
          return cl;
        }
      );
      return {
        ...state,
        collection: withRemovedCollection,
      };
    case ADD_TO_PLAYLIST:
      let withAddedToPlaylist = [...state.playlists].map((p) => {
        const pl = p;
        if (pl.name === action.payload.name) {
          pl.items.push(action.payload.item);
          pl.items = pl.items.map((it, i) => {
            const item = it;
            item.id = i;
            return item;
          });
        }
        return pl;
      });
      return {
        ...state,
        playlists: withAddedToPlaylist,
      };
    case REMOVE_FROM_PLAYLIST:
      let withRemovedFromPlaylist = [...state.playlists].map((p) => {
        const pl = p;
        if (pl.id === action.payload.id) {
          pl.items = pl.items.filter((i) => i.link !== action.payload.link);
          pl.items = pl.items.map((it, i) => {
            const item = it;
            item.id = i;
            return item;
          });
        }
        return pl;
      });
      return {
        ...state,
        playlists: withRemovedFromPlaylist,
      };
    case ADD_NEW_PLAYLIST:
      let withNewPlaylist = [...state.playlists];
      withNewPlaylist.push({
        id: state.playlists.length,
        name: action.payload.name,
        items: [],
      });
      return {
        ...state,
        playlists: withNewPlaylist,
      };
    case RENAME_PLAYLIST:
      let withRenamedPlaylist = [...state.playlists].map((p) => {
        const pl = p;
        if (pl.id === action.payload.id) {
          pl.name = action.payload.name;
        }
        return pl;
      });
      return {
        ...state,
        playlists: withRenamedPlaylist,
      };
    case DELETE_PLAYLIST:
      let withDeletedPlaylist = [...state.playlists].filter(
        (p) => p.id !== action.payload.id
      );
      return {
        ...state,
        playlists: withDeletedPlaylist,
      };
    case SORT_PLAYLIST:
      let sortedItems = [...state.playlists].map((p) => {
        const pl = p;
        if (pl.id === action.payload.id) {
          pl.items = pl.items.sort((a, b) => {
            if (a.title < b.title) {
              return -1;
            }
            if (a.title > b.title) {
              return 1;
            }
            return 0;
          });
        }
        return pl;
      });
      return {
        ...state,
        playlists: sortedItems,
      };
  }
  return state;
}

export default rootReducer;
