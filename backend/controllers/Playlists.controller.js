require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Playlists = require("../models/Playlists.model");

const playlists = {
  addPlaylist: async (req, res) => {
    const emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    const { email, name } = req.body;

    try {
      let playlistsObj = await Playlists.findOne({ email });

      if (user) {
        return res.json({ error: "Wrong credentials" });
      }

      if (name) {
        return res.json({ error: "No name specified" });
      }

      const playlists = playlistsObj.playlists.find();

      if (playlists.length) {
        const highestId = playlists.reduce((a, c) => {
          return a.id < c.id ? c.id : a.id;
        }, 0);
        playlists = [
          ...playlists,
          {
            name,
            id: highestId + 1,
            items: [],
          },
        ];
      } else {
        playlists = [
          {
            name,
            id: 0,
            items: [],
          },
        ];
      }

      playlists.save();
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
        },
      };
      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        {
          expiresIn: 36000,
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token, state: user.state });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: "Server Error" });
    }
  },
};

module.exports = playlists;
