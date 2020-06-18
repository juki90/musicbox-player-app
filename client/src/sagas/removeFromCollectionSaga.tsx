import { put, call, takeEvery } from "redux-saga/effects";
import axios from "axios";
import {
  REMOVE_FROM_COLLECTION_SUCCESS,
  REMOVE_FROM_COLLECTION_FAILED,
  REMOVE_FROM_COLLECTION_REQUEST,
} from "../actions";

function* removeFromCollectionWatcher() {
  yield takeEvery(REMOVE_FROM_COLLECTION_REQUEST, removeFromCollectionWorker);
}

function* removeFromCollectionWorker(action: Action) {
  const response = yield call(() => {
    const token = localStorage.getItem("token");
    try {
      if (!token) {
        return { id: action.payload.id };
      }
      return axios
        .delete("/api/collection", {
          data: {
            id: action.payload.id,
          },
          headers: {
            "x-auth-token": token,
          },
        })
        .then((res) => res.data)
        .catch((err) => {
          return {
            error: "An error occured removing item from collection",
          };
        });
    } catch (err) {
      return {
        error: "An error occured removing item from collection",
      };
    }
  });
  if (response.id >= 0) {
    yield put({
      type: REMOVE_FROM_COLLECTION_SUCCESS,
      payload: {
        id: response.id,
      },
    });
  }
  if (response.error) {
    yield put({
      type: REMOVE_FROM_COLLECTION_FAILED,
      payload: {
        text: response.error,
      },
    });
  }
}

export default removeFromCollectionWatcher;
