import { put, call, takeEvery } from "redux-saga/effects";
import axios from "axios";
import {
  DELETE_PLAYLIST_REQUEST,
  DELETE_PLAYLIST_SUCCESS,
  DELETE_PLAYLIST_FAILED,
  LOGOUT,
} from "../actions";

function* deletePlaylistWatcher() {
  yield takeEvery(DELETE_PLAYLIST_REQUEST, deletePlaylistWorker);
}

function* deletePlaylistWorker(action: Action) {
  const response = yield call(() => {
    const token = localStorage.getItem("token");
    try {
      if (!token) {
        return { id: action.payload.id };
      }
      return axios
        .delete("/api/playlists", {
          headers: {
            "x-auth-token": token,
          },
          data: {
            id: action.payload.id,
          },
        })
        .then((res) => res.data)
        .catch((err) => {
          return {
            error: "An error occured deleting this playlist",
          };
        });
    } catch (err) {
      return {
        error: "An error occured deleting this playlist",
      };
    }
  });
  if (response.id >= 0) {
    yield put({
      type: DELETE_PLAYLIST_SUCCESS,
      payload: {
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
      type: DELETE_PLAYLIST_FAILED,
      payload: {
        text: response.error,
      },
    });
  }
}

export default deletePlaylistWatcher;
