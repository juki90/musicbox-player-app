import { takeLatest, put, call, actionChannel } from "redux-saga/effects";
import axios from "axios";
import { LOGIN_SUCCESS, LOGIN_FAILED, LOGIN_REQUEST } from "../actions";

function* loginWatcher() {
  yield takeLatest(LOGIN_REQUEST, loginWorker);
}

function* loginWorker(action: Action) {
  const response = yield call(() => {
    try {
      return axios
        .post("/api/login", {
          email: action.payload.email,
          password: action.payload.password,
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
  if (response.loggedAs && response.token) {
    localStorage.setItem("token", response.token);
    action.payload.onSuccess();
    yield put({
      type: LOGIN_SUCCESS,
      payload: {
        loggedAs: response.loggedAs,
        playlists: response.playlists,
        collection: response.collection,
        text: `Logged as ${response.loggedAs}`,
      },
    });
  }
  if (response.error) {
    yield put({
      type: LOGIN_FAILED,
      payload: {
        text: response.error,
      },
    });
  }
}

export default loginWatcher;
