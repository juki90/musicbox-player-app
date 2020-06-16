import { all, takeEvery } from "redux-saga/effects";
import registerWatcher from "./registerSaga";
import loginWatcher from "./loginSaga";

function* rootSaga() {
  yield all([registerWatcher(), loginWatcher()]);
}

export default rootSaga;
