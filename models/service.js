const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Provide Name"],
  },
  rate: {
    type: Number,
    required: [true, "Please Provide Rate"],
  },
});

module.exports = mongoose.model("Service", serviceSchema);
