import { all } from "redux-saga/effects";
import registerWatcher from "./registerSaga";
import loginWatcher from "./loginSaga";
import addToCollectionWatcher from "./addToCollectionSaga";
import removeFromCollectionWatcher from "./removeFromCollectionSaga";
import addToPlaylistWatcher from "./addToPlaylistSaga";
import removeFromPlaylistWatcher from "./removeFromPlaylistSaga";
import addNewPlaylistWatcher from "./addNewPlaylistSaga";
import renamePlaylistWatcher from "./renamePlaylistSaga";
import deletePlaylistWatcher from "./deletePlaylistSaga";
import sortPlaylistWatcher from "./sortPlaylistSaga";
import moveInPlaylistWatcher from "./moveInPlaylistSaga";

function* rootSaga() {
  yield all([
    registerWatcher(),
    loginWatcher(),
    addToCollectionWatcher(),
    removeFromCollectionWatcher(),
    addToPlaylistWatcher(),
    removeFromPlaylistWatcher(),
    addNewPlaylistWatcher(),
    renamePlaylistWatcher(),
    deletePlaylistWatcher(),
    sortPlaylistWatcher(),
    moveInPlaylistWatcher(),
  ]);
}

export default rootSaga;
