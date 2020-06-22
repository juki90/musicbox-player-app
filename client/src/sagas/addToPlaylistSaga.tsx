import { put, call, takeEvery } from "redux-saga/effects";
import axios from "axios";
import {
  ADD_TO_PLAYLIST_SUCCESS,
  ADD_TO_PLAYLIST_FAILED,
  ADD_TO_PLAYLIST_REQUEST,
} from "../actions";

function* addToPlaylistWatcher() {
  yield takeEvery(ADD_TO_PLAYLIST_REQUEST, addToPlaylistWorker);
}

function* addToPlaylistWorker(action: Action) {
  const response = yield call(() => {
    const token = localStorage.getItem("token");
    try {
      if (!token) {
        return { id: action.payload.id, item: action.payload.item };
      }
      return axios
        .post(
          "/api/playlists/item",
          {
            id: action.payload.id,
            item: action.payload.item,
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
            error: "An error occured adding video to the playlist",
          };
        });
    } catch (err) {
      return {
        error: "An error occured adding video to the playlist",
      };
    }
  });
  if (response.id >= 0 && response.item) {
    yield put({
      type: ADD_TO_PLAYLIST_SUCCESS,
      payload: {
        id: response.id,
        item: response.item,
      },
    });
  }
  if (response.error) {
    yield put({
      type: ADD_TO_PLAYLIST_FAILED,
      payload: {
        text: response.error,
      },
    });
  }
}

export default addToPlaylistWatcher;
