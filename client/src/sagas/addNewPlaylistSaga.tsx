import { put, call, takeEvery } from "redux-saga/effects";
import axios from "axios";
import {
  ADD_NEW_PLAYLIST_SUCCESS,
  ADD_NEW_PLAYLIST_FAILED,
  ADD_NEW_PLAYLIST_REQUEST,
  LOGOUT,
} from "../actions";

function* addNewPlaylistWatcher() {
  yield takeEvery(ADD_NEW_PLAYLIST_REQUEST, addNewPlaylistWorker);
}

function* addNewPlaylistWorker(action: Action) {
  const response = yield call(() => {
    const token = localStorage.getItem("token");
    try {
      if (!token) {
        return { name: action.payload.name };
      }
      return axios
        .post(
          "/api/playlists",
          {
            name: action.payload.name,
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
  if (response.name) {
    yield put({
      type: ADD_NEW_PLAYLIST_SUCCESS,
      payload: {
        name: response.name,
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
      type: ADD_NEW_PLAYLIST_FAILED,
      payload: {
        text: response.error,
      },
    });
  }
}

export default addNewPlaylistWatcher;
