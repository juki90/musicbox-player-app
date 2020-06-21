import { put, call, takeEvery } from "redux-saga/effects";
import axios from "axios";
import {
  RENAME_PLAYLIST_REQUEST,
  RENAME_PLAYLIST_SUCCESS,
  RENAME_PLAYLIST_FAILED,
  LOGOUT,
} from "../actions";

function* renamePlaylistWatcher() {
  yield takeEvery(RENAME_PLAYLIST_REQUEST, renamePlaylistWorker);
}

function* renamePlaylistWorker(action: Action) {
  const response = yield call(() => {
    const token = localStorage.getItem("token");
    try {
      if (!token) {
        return { name: action.payload.name, id: action.payload.id };
      }
      return axios
        .put(
          "/api/playlists",
          {
            name: action.payload.name,
            id: action.payload.id,
          },
          {
            headers: {
              "x-auth-token": token,
            },
          }
        )
        .then((res) => res.data)
        .catch((err) => {
          return {
            error: "An error occured adding new playlist",
          };
        });
    } catch (err) {
      return {
        error: "An error occured adding new playlist",
      };
    }
  });
  if (response.name && response.id) {
    yield put({
      type: RENAME_PLAYLIST_SUCCESS,
      payload: {
        name: response.name,
        id: response.id,
      },
    });
  }
  if (response.authError) {
    yield put({
      type: LOGOUT,
      payload: {
        text: response.authError,
      },
    });
  }
  if (response.error) {
    yield put({
      type: RENAME_PLAYLIST_FAILED,
      payload: {
        text: response.error,
      },
    });
  }
}

export default renamePlaylistWatcher;
