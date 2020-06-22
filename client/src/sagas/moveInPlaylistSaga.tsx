import { put, call, takeEvery } from "redux-saga/effects";
import axios from "axios";
import {
  MOVE_IN_PLAYLIST_REQUEST,
  MOVE_IN_PLAYLIST_SUCCESS,
  MOVE_IN_PLAYLIST_FAILED,
  LOGOUT,
} from "../actions";

function* moveInPlaylistWatcher() {
  yield takeEvery(MOVE_IN_PLAYLIST_REQUEST, moveInPlaylistWorker);
}

function* moveInPlaylistWorker(action: Action) {
  const response = yield call(() => {
    const token = localStorage.getItem("token");
    try {
      if (!token) {
        return {
          id: action.payload.id,
          vidId: action.payload.vidId,
          toVid: action.payload.toVid,
        };
      }
      return axios
        .patch(
          "/api/playlists/item",
          {
            id: action.payload.id,
            vidId: action.payload.vidId,
            toVid: action.payload.toVid,
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
  if (response.id >= 0 && response.vidId >= 0 && response.toVid >= 0) {
    yield put({
      type: MOVE_IN_PLAYLIST_SUCCESS,
      payload: {
        id: response.id,
        vidId: response.vidId,
        toVid: response.toVid,
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
      type: MOVE_IN_PLAYLIST_FAILED,
      payload: {
        text: response.error,
      },
    });
  }
}

export default moveInPlaylistWatcher;
