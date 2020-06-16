const mongoose = require("mongoose");

const theCollectionSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  theCollection: [
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
});

module.exports = mongoose.model("theCollection", theCollectionSchema);
