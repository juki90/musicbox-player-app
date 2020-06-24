const router = require("express").Router();
const auth = require("../middleware/auth");
const { user } = require("../controllers");
const { theCollection } = require("../controllers");
const { playlists } = require("../controllers");
const { search } = require("../controllers");

router.post("/register", user.register);
router.post("/login", user.login);

router.post("/collection", auth, theCollection.addToCollection);
router.delete("/collection", auth, theCollection.removeFromCollection);

router.post("/playlists/item", auth, playlists.addToPlaylist);
router.delete("/playlists/item", auth, playlists.removeFromPlaylist);
router.patch("/playlists/item", auth, playlists.moveInPlaylist);

router.post("/playlists", auth, playlists.addNewPlaylist);
router.put("/playlists", auth, playlists.renamePlaylist);
router.patch("/playlists", auth, playlists.sortPlaylist);
router.delete("/playlists", auth, playlists.deletePlaylist);

router.post("/search", search.search);

module.exports = router;
