import { put, call, takeEvery } from "redux-saga/effects";
import axios from "axios";
import {
  SORT_PLAYLIST_REQUEST,
  SORT_PLAYLIST_SUCCESS,
  SORT_PLAYLIST_FAILED,
  LOGOUT,
} from "../actions";

function* sortPlaylistWatcher() {
  yield takeEvery(SORT_PLAYLIST_REQUEST, sortPlaylistWorker);
}

function* sortPlaylistWorker(action: Action) {
  const response = yield call(() => {
    const token = localStorage.getItem("token");
    try {
      if (!token) {
        return { way: action.payload.way, id: action.payload.id };
      }
      return axios
        .patch(
          "/api/playlists",
          {
            way: action.payload.way,
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
            error: "An error occured renaming this playlist",
          };
        });
    } catch (err) {
      return {
        error: "An error occured renaming this playlist",
      };
    }
  });
  if (response.way && response.id >= 0) {
    yield put({
      type: SORT_PLAYLIST_SUCCESS,
      payload: {
        way: response.way,
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
      type: SORT_PLAYLIST_FAILED,
      payload: {
        text: response.error,
      },
    });
  }
}

export default sortPlaylistWatcher;
