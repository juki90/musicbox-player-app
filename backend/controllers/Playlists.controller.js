require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Playlists = require("../models/Playlists.model");

const playlists = {
  addToPlaylist: async (req, res) => {
    const { email, id, item } = req.body;

    let playlistsObj = await Playlists.findOne({ email });

    if (!playlistsObj) {
      res.status(500).json({ error: "Server Error" });
    }

    const withAddedToPlaylist = [...playlistsObj.playlists].map((p) => {
      const pl = p;
      if (pl.id === id) {
        pl.items.push(item);
        pl.items = pl.items.map((it, i) => {
          const item = it;
          item.id = i;
          return item;
        });
      }
      return pl;
    });

    playlistsObj.playlists = withAddedToPlaylist;

    try {
      const saved = await playlistsObj.save();
      if (saved) {
        res.json({
          id,
          item,
        });
      }
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Server Error" });
    }
  },
  removeFromPlaylist: async (req, res) => {
    const { email, id, vidId } = req.body;

    let playlistsObj = await Playlists.findOne({ email });

    if (!playlistsObj) {
      res.status(500).json({ error: "Server Error" });
    }

    const withRemovedFromPlaylist = [...playlistsObj.playlists].map((p) => {
      const pl = p;
      if (pl.id === id) {
        pl.items = pl.items.filter((i) => i.id !== vidId);
        pl.items = pl.items.map((it, i) => {
          const item = it;
          item.id = i;
          return item;
        });
      }
      return pl;
    });

    playlistsObj.playlists = withRemovedFromPlaylist;

    try {
      const saved = await playlistsObj.save();
      if (saved) {
        res.json({
          id,
          vidId,
        });
      }
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Server Error" });
    }
  },
  addNewPlaylist: async (req, res) => {
    const { email, name } = req.body;

    let playlistsObj = await Playlists.findOne({ email });

    if (!playlistsObj) {
      res.status(500).json({ error: "Server Error" });
    }

    const withNewPlaylist = [...playlistsObj.playlists];
    withNewPlaylist.push({
      id: playlistsObj.playlists.length,
      name: name,
      items: [],
    });

    playlistsObj.playlists = withNewPlaylist;

    try {
      const saved = await playlistsObj.save();
      if (saved) {
        res.json({
          name,
        });
      }
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Server Error" });
    }
  },
  renamePlaylist: async (req, res) => {
    const { email, name, id } = req.body;

    let playlistsObj = await Playlists.findOne({ email });

    if (!playlistsObj) {
      res.status(500).json({ error: "Server Error" });
    }

    const withRenamedPlaylist = [...playlistsObj.playlists].map((p) => {
      const pl = p;
      if (pl.id === id) {
        pl.name = name;
      }
      return pl;
    });

    playlistsObj.playlists = withRenamedPlaylist;

    try {
      const saved = await playlistsObj.save();
      if (saved) {
        res.json({
          name,
          id,
        });
      }
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Server Error" });
    }
  },
};

module.exports = playlists;
