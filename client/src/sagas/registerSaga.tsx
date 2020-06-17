import { takeLatest, put, call, actionChannel } from "redux-saga/effects";
import axios from "axios";
import {
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  REGISTER_REQUEST,
} from "../actions";

function* registerWatcher() {
  yield takeLatest(REGISTER_REQUEST, registerWorker);
}

function* registerWorker(action: Action) {
  const response = yield call(() => {
    try {
      return axios
        .post("/api/register", {
          name: action.payload.name,
          email: action.payload.email,
          password: action.payload.password,
          data: action.payload.data,
        })
        .then((res) => res.data)
        .catch((err) => {
          return {
            error: "An error occured making this request",
          };
        });
    } catch {
      return {
        error: "An error occured making this request",
      };
    }
  });
  if (response.name && response.token) {
    localStorage.setItem("token", response.token);
    yield put({
      type: REGISTER_SUCCESS,
      payload: {
        name: response.name,
        text: "Registration successful",
      },
    });
  }
  if (response.error) {
    yield put({
      type: REGISTER_FAILED,
      payload: {
        text: response.error,
      },
    });
  }
}

export default registerWatcher;
