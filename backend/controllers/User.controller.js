require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User.model");
const Playlists = require("../models/Playlists.model");
const theCollection = require("../models/theCollection.model");

const user = {
  register: async (req, res) => {
    const emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    const { name, email, password, data } = req.body;

    if (!email || !password) {
      return res.json({ error: "One or both fields are not filled up" });
    }
    if (!name) {
      return res.json({ error: "No name is specified" });
    }
    if (!emailRegex.test(email)) {
      return res.json({ error: "Wrong e-mail format" });
    }
    if (password.length < 8) {
      return res.json({
        error: "Password should consist of at least 8 characters",
      });
    }

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res.json({ error: "User already exists" });
      }

      user = new User({
        name,
        email,
        password,
      });

      let userPlaylists = new Playlists({
        email,
        playlists: data.playlists,
      });

      let userCollection = new theCollection({
        email,
        theCollection: data.collection,
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();
      await userPlaylists.save();
      await userCollection.save();

      const payload = {
        user: { id: user.id, email: user.email },
      };

      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        {
          expiresIn: 36000,
        },
        (err, token) => {
          if (err) {
            throw err;
          }
          res.json({ token, name });
        }
      );
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Server Error" });
    }
  },
  login: async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });

      if (!user) {
        return res.json({ error: "Invalid email or password" });
      }
      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        return res.json({ error: "Invalid email or password" });
      }
      const payload = {
        user: {
          id: user.id,
          email: user.email,
        },
      };

      const userPlaylists = await Playlists.findOne({ email });
      const userCollection = await theCollection.findOne({ email });

      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        {
          expiresIn: 36000,
        },
        (err, token) => {
          if (err) throw err;
          res.json({
            token,
            playlists: userPlaylists.playlists,
            collection: userCollection.theCollection,
            loggedAs: user.name,
          });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: "Server Error" });
    }
  },
};

module.exports = user;
