const mongo = require("mongoose");

const publication = mongo.Schema({
  fileName: String,
  contentType: String,
  size: Number,
  data: Buffer,
});

module.exports = mongo.model('Publication', publication)