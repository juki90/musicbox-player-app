require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Search = {
  search: async (req, res) => {
    const { sites, options } = req.body;

    try {
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Search failed on the server" });
    }
  },
};

module.exports = Search;
