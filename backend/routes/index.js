const router = require("express").Router();
const axios = require("axios");
const encodeurl = require("encodeurl");
const auth = require("../middleware/auth");
const { user } = require("../controllers");
const { theCollection } = require("../controllers");

router.post("/register", user.register);
router.post("/login", user.login);

router.post("/collection", auth, theCollection.addToCollection);

module.exports = router;
