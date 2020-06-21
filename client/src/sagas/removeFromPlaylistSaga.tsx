import { put, call, takeEvery } from "redux-saga/effects";
import axios from "axios";
import {
  REMOVE_FROM_PLAYLIST_SUCCESS,
  REMOVE_FROM_PLAYLIST_FAILED,
  REMOVE_FROM_PLAYLIST_REQUEST,
  LOGOUT,
} from "../actions";

function* removeFromPlaylistWatcher() {
  yield takeEvery(REMOVE_FROM_PLAYLIST_REQUEST, removeFromPlaylistWorker);
}

function* removeFromPlaylistWorker(action: Action) {
  const response = yield call(() => {
    const token = localStorage.getItem("token");
    try {
      if (!token) {
        return { id: action.payload.id, vidId: action.payload.vidId };
      }
      return axios
        .delete("/api/playlists/item", {
          data: {
            id: action.payload.id,
            vidId: action.payload.vidId,
          },
          headers: {
            "x-auth-token": token,
          },
        })
        .then((res) => res.data)
        .catch((err) => {
          return {
            error: "An error occured adding video to the playlist",
          };
        });
    } catch (err) {
      return {
        error: "An error occured adding video to the playlist",
      };
    }
  });
  if (response.id >= 0 && response.vidId >= 0) {
    yield put({
      type: REMOVE_FROM_PLAYLIST_SUCCESS,
      payload: {
        id: response.id,
        vidId: response.vidId,
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
      type: REMOVE_FROM_PLAYLIST_FAILED,
      payload: {
        text: response.error,
      },
    });
  }
}

export default removeFromPlaylistWatcher;
