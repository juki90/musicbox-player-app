import { all } from "redux-saga/effects";
import registerWatcher from "./registerSaga";
import loginWatcher from "./loginSaga";
import addToCollectionWatcher from "./addToCollectionSaga";
import removeFromCollectionWatcher from "./removeFromCollectionSaga";
import addToPlaylistWatcher from "./addToPlaylistSaga";
import removeFromPlaylistWatcher from "./addToCollectionSaga";

function* rootSaga() {
  yield all([
    registerWatcher(),
    loginWatcher(),
    addToCollectionWatcher(),
    removeFromCollectionWatcher(),
    addToPlaylistWatcher(),
    removeFromPlaylistWatcher(),
  ]);
}

export default rootSaga;
