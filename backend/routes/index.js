const router = require("express").Router();
const axios = require("axios");
const encodeurl = require("encodeurl");
const auth = require("../middleware/auth");
const { user } = require("../controllers");
const { playlists } = require("../controllers");

router.post("/register", user.register);
router.post("/login", user.login);

router.post("/playlists", auth, playlists.addPlaylist);

module.exports = router;
