const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    default: "Admin",
    enum: ["Admin"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Admin password Can not be empty"],
    minlength: 6,
  },
});

adminSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

adminSchema.pre("findOneAndUpdate", async function () {
  const salt = await bcrypt.genSalt(10);
  this._update.password = await bcrypt.hash(this._update.password, salt);
});

adminSchema.methods.createJWT = function () {
  return jwt.sign({ userID: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
};

adminSchema.methods.verifyPassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

module.exports = mongoose.model("Admin", adminSchema);
