const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  playlists: [
    {
      id: {
        type: Number,
        required: true,
      },
      items: [
        {
          id: {
            type: Number,
            required: true,
          },
          added: {
            type: Date,
            required: true,
          },
          link: {
            type: String,
            required: true,
          },
          title: {
            type: String,
            required: true,
          },
          desc: {
            type: String,
            required: false,
          },
        },
      ],
      name: {
        type: String,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model("playlists", userSchema);
