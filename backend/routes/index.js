const router = require("express").Router();
const axios = require("axios");
const encodeurl = require("encodeurl");
const auth = require("../middleware/auth");
const { user } = require("../controllers");

router.post("/register", user.register);
router.post("/login", user.login);
router.post("/", auth, user.save);

router.post("/search", (req, res) => {
  const { search, ua } = req.body;
  const searchEncoded = encodeurl(search);
});

module.exports = router;
