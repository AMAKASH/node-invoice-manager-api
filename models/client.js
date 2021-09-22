const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Provide Name"],
  },
  phone: {
    type: String,
    required: [true, "Please Provide Phone"],
    unique: true,
    minlength: 11,
    maxlength: 11,
  },
  email: {
    type: String,
    required: [true, "Please Provide Email"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a valid email",
    ],
    unique: true,
  },
  address: {
    type: String,
  },
});

module.exports = mongoose.model("Client", clientSchema);
