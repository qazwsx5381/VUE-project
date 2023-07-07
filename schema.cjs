const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VSchema = new Schema({
  data: Number,
});
module.exports = mongoose.model("vdb", VSchema, "vdb");
