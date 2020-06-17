require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const theCollectionModel = require("../models/theCollection.model");

const theCollection = {
  addToCollection: async (req, res) => {
    const { item, email } = req.body;

    let collectionObj = await theCollectionModel.findOne({ email });

    console.log(collectionObj);

    let withAddedToCollection = [item, ...collectionObj.theCollection].sort(
      (a, b) => {
        const aDate = new Date(a.added);
        const bDate = new Date(b.added);
        return bDate.getTime() - aDate.getTime();
      }
    );
    withAddedToCollection = withAddedToCollection.map((c, i) => {
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
      console.error(error.message);
      res.status(500).json({ error: "Server Error" });
    }
  },
};

module.exports = theCollection;
