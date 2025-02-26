const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema({
  name: {
    type: string,
  },
  desc: {
    type: string,
  },
  img: {
    data: Buffer,
    contentType: String,
  },
});

module.exports = mongoose.model("imageSchema", ImageSchema);
