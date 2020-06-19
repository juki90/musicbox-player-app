import { put, call, takeEvery } from "redux-saga/effects";
import axios from "axios";
import {
  ADD_TO_COLLECTION_SUCCESS,
  ADD_TO_COLLECTION_FAILED,
  ADD_TO_COLLECTION_REQUEST,
} from "../actions";

function* addToCollectionWatcher() {
  yield takeEvery(ADD_TO_COLLECTION_REQUEST, addToCollectionWorker);
}

function* addToCollectionWorker(action: Action) {
  const response = yield call(() => {
    const token = localStorage.getItem("token");
    try {
      if (!token) {
        return { item: action.payload.item };
      }
      return axios
        .post(
          "/api/collection",
          {
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
            error: "An error occured adding new item to collection",
          };
        });
    } catch (err) {
      return {
        error: "An error occured adding new item to collection",
      };
    }
  });

  if (response.item) {
    yield put({
      type: ADD_TO_COLLECTION_SUCCESS,
      payload: {
        item: response.item,
      },
    });
  }
  if (response.error) {
    yield put({
      type: ADD_TO_COLLECTION_FAILED,
      payload: {
        text: response.error,
      },
    });
  }
}

export default addToCollectionWatcher;
