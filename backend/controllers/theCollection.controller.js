require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const theCollectionModel = require("../models/theCollection.model");

const theCollection = {
  addToCollection: async (req, res) => {
    const { item, email } = req.body;

    let collectionObj = await theCollectionModel.findOne({ email });

    if (!collectionObj) {
      res.status(404).json({ error: "Server Error" });
    }

    let withAddedToCollection = [item, ...collectionObj.theCollection]
      .sort((a, b) => {
        const aDate = new Date(a.added);
        const bDate = new Date(b.added);
        return bDate.getTime() - aDate.getTime();
      })
      .map((c, i) => {
        const cl = c;
        cl.id = i;
        return cl;
      });

    collectionObj.theCollection = withAddedToCollection;

    try {
      const saved = await collectionObj.save();
      if (saved) {
        res.json({
          item,
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Document not found" });
    }
  },
  removeFromCollection: async (req, res) => {
    const { id, email } = req.body;

    let collectionObj = await theCollectionModel.findOne({ email });

    if (!collectionObj) {
      res.status(404).json({ error: "Document not found" });
      return;
    }

    const withRemovedCollection = [...collectionObj.theCollection]
      .filter((e) => {
        return e.id !== id;
      })
      .map((c, i) => {
        const cl = c;
        cl.id = i;
        return cl;
      });

    collectionObj.theCollection = withRemovedCollection;

    try {
      const saved = await collectionObj.save();
      if (saved) {
        res.json({
          id,
        });
      }
    } catch (error) {
      res.status(500).json({ error: "Server Error" });
    }
  },
};

module.exports = theCollection;
