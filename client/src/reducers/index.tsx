import {
  ADD_TO_COLLECTION_FAILED,
  ADD_TO_COLLECTION_SUCCESS,
  REMOVE_FROM_COLLECTION_FAILED,
  REMOVE_FROM_COLLECTION_SUCCESS,
  ADD_TO_PLAYLIST_FAILED,
  ADD_TO_PLAYLIST_SUCCESS,
  REMOVE_FROM_PLAYLIST_FAILED,
  REMOVE_FROM_PLAYLIST_SUCCESS,
  ADD_NEW_PLAYLIST_FAILED,
  ADD_NEW_PLAYLIST_SUCCESS,
  RENAME_PLAYLIST_SUCCESS,
  RENAME_PLAYLIST_FAILED,
  DELETE_PLAYLIST_FAILED,
  DELETE_PLAYLIST_SUCCESS,
  SORT_PLAYLIST_FAILED,
  SORT_PLAYLIST_SUCCESS,
  MOVE_IN_PLAYLIST_FAILED,
  MOVE_IN_PLAYLIST_SUCCESS,
  PLAY_VIDEO,
  SKIP_TO_VIDEO,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  REMOVE_NOTIFICATION,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  LOGOUT,
} from "../actions";
import { Reducer } from "redux";

const initialState: StateProps = {
  collection: [],
  playlists: [],
  inPlayer: undefined,
  loggedAs: "",
  message: {
    error: "",
    message: "",
  },
};

const rootReducer: Reducer<StateProps, Action> = (
  state: StateProps = initialState,
  action: Action
) => {
  switch (action.type) {
    case ADD_TO_COLLECTION_SUCCESS:
      let withAddedToCollection = [
        (action as addToCollectionSuccessAction).payload.item,
        ...state.collection,
      ].sort((a: Item, b: Item) => {
        const aDate = new Date(a.added);
        const bDate = new Date(b.added);
        return bDate.getTime() - aDate.getTime();
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
    case REMOVE_FROM_COLLECTION_SUCCESS:
      const withRemovedCollection = [...state.collection].filter((e) => {
        return (
          e.id !== (action as removeFromCollectionSuccessAction).payload.id
        );
      });

      return {
        ...state,
        collection: withRemovedCollection.map((c: Item, i: number) => {
          const cl = c;
          cl.id = i;
          return cl;
        }),
      };

    case ADD_TO_PLAYLIST_SUCCESS:
      const withAddedToPlaylist = [...state.playlists].map((p) => {
        const pl = p;
        if (pl.id === (action as addToPlaylistSuccessAction).payload.id) {
          pl.items.push((action as addToPlaylistSuccessAction).payload.item);
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
    case REMOVE_FROM_PLAYLIST_SUCCESS:
      const withRemovedFromPlaylist = [...state.playlists].map((p) => {
        const pl = p;
        if (pl.id === (action as removeFromPlaylistSuccessAction).payload.id) {
          pl.items = pl.items.filter(
            (i) =>
              i.id !== (action as removeFromPlaylistSuccessAction).payload.vidId
          );
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
    case ADD_NEW_PLAYLIST_SUCCESS:
      const withNewPlaylist = [...state.playlists];
      withNewPlaylist.push({
        id: state.playlists.length,
        name: (action as addNewPlaylistSuccessAction).payload.name,
        items: [],
      });
      return {
        ...state,
        playlists: withNewPlaylist,
      };
    case RENAME_PLAYLIST_SUCCESS:
      const withRenamedPlaylist = [...state.playlists].map((p) => {
        const pl = p;
        if (pl.id === (action as renamePlaylistSuccessAction).payload.id) {
          pl.name = (action as renamePlaylistSuccessAction).payload.name;
        }
        return pl;
      });
      return {
        ...state,
        playlists: withRenamedPlaylist,
      };
    case DELETE_PLAYLIST_SUCCESS:
      const withDeletedPlaylist = [...state.playlists]
        .filter(
          (p) => p.id !== (action as deletePlaylistSuccessAction).payload.id
        )
        .map((p, i) => {
          const pl = p;
          pl.id = i;
          return pl;
        });
      return {
        ...state,
        playlists: withDeletedPlaylist,
      };
    case SORT_PLAYLIST_SUCCESS:
      const sortedItems = [...state.playlists].map((p) => {
        const pl = p;
        const way = (action as sortPlaylistSuccessAction).payload.way;
        if (
          pl.id === (action as sortPlaylistSuccessAction).payload.id &&
          way === "name"
        ) {
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
        if (
          pl.id === (action as sortPlaylistSuccessAction).payload.id &&
          way === "name-reversed"
        ) {
          pl.items = pl.items.sort((a, b) => {
            if (a.title < b.title) {
              return 1;
            }
            if (a.title > b.title) {
              return -1;
            }
            return 0;
          });
        }
        if (
          pl.id === (action as sortPlaylistSuccessAction).payload.id &&
          way === "date"
        ) {
          pl.items = pl.items.sort((a, b) => {
            const aDate = new Date(a.added);
            const bDate = new Date(b.added);
            if (aDate.getTime() < bDate.getTime()) {
              return 1;
            }
            if (aDate.getTime() > bDate.getTime()) {
              return -1;
            }
            return 0;
          });
        }
        if (
          pl.id === (action as sortPlaylistSuccessAction).payload.id &&
          way === "date-reversed"
        ) {
          pl.items = pl.items.sort((a, b) => {
            const aDate = new Date(a.added);
            const bDate = new Date(b.added);
            if (aDate.getTime() < bDate.getTime()) {
              return -1;
            }
            if (aDate.getTime() > bDate.getTime()) {
              return 1;
            }
            return 0;
          });
        }
        pl.items = pl.items.map((it, i) => {
          const item = it;
          item.id = i;
          return item;
        });
        return pl;
      });
      return {
        ...state,
        playlists: sortedItems,
      };
    case MOVE_IN_PLAYLIST_SUCCESS:
      const withMovedInPlaylist = [...state.playlists].map((p) => {
        const pl = p;
        if (pl.id === (action as moveInPlaylistSuccessAction).payload.id) {
          pl.items.map((it) => {
            const item = it;
            if (
              item.id === (action as moveInPlaylistSuccessAction).payload.vidId
            ) {
              item.id =
                (action as moveInPlaylistSuccessAction).payload.toVid + 0.5;
            }
            return item;
          });

          pl.items = pl.items.sort((a, b) => {
            if (a.id < b.id) {
              return -1;
            }
            if (a.id > b.id) {
              return 1;
            }
            return 0;
          });

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
        playlists: withMovedInPlaylist,
      };
    case PLAY_VIDEO:
      if ((action as playVideoAction).payload.fromSearch !== undefined) {
        return {
          ...state,
          collection: state.collection.map((i) => {
            const item = i;
            item.playing = false;
            return item;
          }),
          playlists: state.playlists.map((pl) => {
            const playlist = pl;
            playlist.items = playlist.items.map((i) => {
              const item = i;
              item.playing = false;
              return item;
            });
            return playlist;
          }),
          inPlayer: (action as playVideoAction).payload.fromSearch,
        };
      }
      if ((action as playVideoAction).payload.vidId === -1) {
        return {
          ...state,
          collection: state.collection.map((i) => {
            const item = i;
            item.playing = false;
            return item;
          }),
          playlists: state.playlists.map((pl) => {
            const playlist = pl;
            playlist.items = playlist.items.map((i) => {
              const item = i;
              item.playing = false;
              return item;
            });
            return playlist;
          }),
          inPlayer: undefined,
        };
      }

      const withPlayingVideo: Playlist[] | Item[] =
        (action as playVideoAction).payload.plId !== undefined
          ? state.playlists.map((pl) => {
              const playlist = pl;
              if (playlist.id === (action as playVideoAction).payload.plId) {
                playlist.items = playlist.items.map((i) => {
                  const item = i;
                  item.playing = false;
                  if (item.id === (action as playVideoAction).payload.vidId) {
                    item.playing = true;
                    item.fromPlaylist = playlist.id;
                  }
                  return item;
                });
              }
              return playlist;
            })
          : state.collection.map((i) => {
              const item = i;
              item.playing = false;
              if (item.id === (action as playVideoAction).payload.vidId) {
                item.playing = true;
              }
              return item;
            });

      return {
        ...state,
        collection:
          (action as playVideoAction).payload.plId !== undefined
            ? state.collection.map((i) => {
                const it = i;
                it.playing = false;
                return it;
              })
            : (withPlayingVideo as Item[]),
        playlists:
          (action as playVideoAction).payload.plId !== undefined
            ? (withPlayingVideo as Playlist[])
            : state.playlists.map((pl) => {
                const playlist = pl;
                playlist.items = playlist.items.map((i) => {
                  const it = i;
                  it.playing = false;
                  return it;
                });
                return playlist;
              }),
        inPlayer:
          (action as playVideoAction).payload.plId !== undefined
            ? state.playlists
                .filter(
                  (pl) =>
                    (pl.id === (action as playVideoAction).payload.plId) !==
                    undefined
                )[0]
                .items.filter(
                  (i) => i.id === (action as playVideoAction).payload.vidId
                )[0]
            : state.collection.filter(
                (i) => i.id === (action as playVideoAction).payload.vidId
              )[0],
      };

    case SKIP_TO_VIDEO:
      let collectionIdx = 0;
      let playlistIdx = 0;
      let playlistItemIdx = 0;
      const isInPlaylist =
        (action as skipToVideoAction).payload.inPlaylist !== undefined;
      const withSkippedVideo = isInPlaylist
        ? state.playlists.map((pl) => {
            const playlist = pl;
            if (
              (action as skipToVideoAction).payload.skipTo < 0 &&
              playlist.id === (action as skipToVideoAction).payload.inPlaylist
            ) {
              const plItems = [...playlist.items];
              playlist.items.forEach((it, i) => {
                if (plItems[i].playing) {
                  plItems[i - 1].playing = true;
                  plItems[i].playing = false;
                  playlistIdx = playlist.id;
                  playlistItemIdx = it.id - 1;
                }
              });
              playlist.items = plItems;
            }
            if (
              (action as skipToVideoAction).payload.skipTo > 0 &&
              playlist.id === (action as skipToVideoAction).payload.inPlaylist
            ) {
              const plItems = [...playlist.items];
              playlist.items.forEach((it, i) => {
                if (plItems[i].playing) {
                  playlistItemIdx = plItems[i].id + 1;
                  plItems[i].playing = false;
                  playlistIdx = playlist.id;
                }
              });
              plItems[playlistItemIdx].playing = true;
              playlist.items = plItems;
            }
            return playlist;
          })
        : state.collection.map((it) => {
            const item = it;
            if (
              (action as skipToVideoAction).payload.skipTo > 0 &&
              item.playing
            ) {
              item.playing = false;
              collectionIdx = item.id + 1;
            }
            if (
              (action as skipToVideoAction).payload.skipTo < 0 &&
              item.playing
            ) {
              item.playing = false;
              collectionIdx = item.id - 1;
            }
            return item;
          });

      let playingItem: Item;

      if (!isInPlaylist) {
        (withSkippedVideo[collectionIdx] as Item).playing = true;
        playingItem = { ...(withSkippedVideo[collectionIdx] as Item) };
      } else {
        playingItem = (withSkippedVideo[playlistIdx] as Playlist).items[
          playlistItemIdx
        ];
        playingItem.fromPlaylist = playlistIdx;
        playingItem = { ...playingItem };
      }

      return {
        ...state,
        collection: !isInPlaylist
          ? (withSkippedVideo as Item[])
          : state.collection,
        playlists: isInPlaylist
          ? (withSkippedVideo as Playlist[])
          : state.playlists,
        inPlayer: playingItem as Item,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        message: {
          ...state.message,
          message: "Successfully registered",
        },
        loggedAs: action.payload.name,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        collection: action.payload.collection,
        playlists: action.payload.playlists,
        loggedAs: action.payload.loggedAs,
        message: {
          error: "",
          message: action.payload.text,
        },
      };
    case REGISTER_FAILED:
    case LOGIN_FAILED:
    case ADD_TO_COLLECTION_FAILED:
    case REMOVE_FROM_COLLECTION_FAILED:
    case ADD_TO_PLAYLIST_FAILED:
    case REMOVE_FROM_PLAYLIST_FAILED:
    case ADD_NEW_PLAYLIST_FAILED:
    case RENAME_PLAYLIST_FAILED:
    case DELETE_PLAYLIST_FAILED:
    case SORT_PLAYLIST_FAILED:
    case MOVE_IN_PLAYLIST_FAILED:
      return {
        ...state,
        message: {
          ...state.message,
          error: action.payload.text,
        },
      };

    case REMOVE_NOTIFICATION:
      return {
        ...state,
        message: {
          message: "",
          error: "",
        },
      };
    case LOGOUT:
      localStorage.removeItem("token");
      return {
        ...initialState,
        loggedAs: "",
        message: {
          error: "",
          message: "You have been logged out",
        },
      };
  }
  return state;
};

export default rootReducer;
