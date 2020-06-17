import { all, takeEvery } from "redux-saga/effects";
import registerWatcher from "./registerSaga";
import loginWatcher from "./loginSaga";
import addToCollectionWatcher from "./addToCollectionSaga";

function* rootSaga() {
  yield all([registerWatcher(), loginWatcher(), addToCollectionWatcher()]);
}

export default rootSaga;
