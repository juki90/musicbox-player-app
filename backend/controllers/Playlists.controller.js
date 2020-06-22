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
  deletePlaylist: async (req, res) => {
    const { email, id } = req.body;

    let playlistsObj = await Playlists.findOne({ email });

    if (!playlistsObj) {
      res.status(500).json({ error: "Server Error" });
    }

    const withDeletedPlaylist = [...playlistsObj.playlists]
      .filter((p) => p.id !== id)
      .map((p, i) => {
        const pl = p;
        pl.id = i;
        return pl;
      });

    playlistsObj.playlists = withDeletedPlaylist;

    try {
      const saved = await playlistsObj.save();
      if (saved) {
        res.json({
          id,
        });
      }
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Server Error" });
    }
  },
  sortPlaylist: async (req, res) => {
    const { email, id, way } = req.body;

    let playlistsObj = await Playlists.findOne({ email });

    if (!playlistsObj) {
      res.status(500).json({ error: "Server Error" });
    }

    const sortedItems = [...playlistsObj.playlists].map((p) => {
      const pl = p;
      if (pl.id === id && way === "name") {
        pl.items = pl.items.sort((a, b) => {
          if (a.title < b.title) {
            return -1;
          }
          if (a.title > b.title) {
            return 1;
          }
          return 0;
        });
      }
      if (pl.id === id && way === "name-reversed") {
        pl.items = pl.items.sort((a, b) => {
          if (a.title < b.title) {
            return 1;
          }
          if (a.title > b.title) {
            return -1;
          }
          return 0;
        });
      }
      if (pl.id === id && way === "date") {
        pl.items = pl.items.sort((a, b) => {
          const aDate = new Date(a.added);
          const bDate = new Date(b.added);
          if (aDate.getTime() < bDate.getTime()) {
            return 1;
          }
          if (aDate.getTime() > bDate.getTime()) {
            return -1;
          }
          return 0;
        });
      }
      if (pl.id === id && way === "date-reversed") {
        pl.items = pl.items.sort((a, b) => {
          const aDate = new Date(a.added);
          const bDate = new Date(b.added);
          if (aDate.getTime() < bDate.getTime()) {
            return -1;
          }
          if (aDate.getTime() > bDate.getTime()) {
            return 1;
          }
          return 0;
        });
      }
      pl.items = pl.items.map((it, i) => {
        const item = it;
        item.id = i;
        return item;
      });
      return pl;
    });

    playlistsObj.playlists = sortedItems;

    try {
      const saved = await playlistsObj.save();
      if (saved) {
        res.json({
          id,
          way,
        });
      }
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Server Error" });
    }
  },
  moveInPlaylist: async (req, res) => {
    const { email, id, vidId, toVid } = req.body;

    let playlistsObj = await Playlists.findOne({ email });

    if (!playlistsObj) {
      res.status(500).json({ error: "Server Error" });
    }

    const withMovedInPlaylist = [...playlistsObj.playlists].map((p) => {
      const pl = p;
      if (pl.id === id) {
        pl.items.map((it) => {
          const item = it;
          if (item.id === vidId) {
            item.id = toVid + 0.5;
          }
          return item;
        });

        pl.items = pl.items.sort((a, b) => {
          if (a.id < b.id) {
            return -1;
          }
          if (a.id > b.id) {
            return 1;
          }
          return 0;
        });

        pl.items = pl.items.map((it, i) => {
          const item = it;
          item.id = i;
          return item;
        });
      }
      return pl;
    });

    playlistsObj.playlists = withMovedInPlaylist;

    try {
      const saved = await playlistsObj.save();
      if (saved) {
        res.json({
          id,
          vidId,
          toVid,
        });
      }
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Server Error" });
    }
  },
};

module.exports = playlists;
