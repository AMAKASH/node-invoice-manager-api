const Admin = require("../models/admin");
const { StatusCodes } = require("http-status-codes");
const {
  BadRequestError,
  UnauthenticatedError,
  CustomAPIError,
} = require("../errors");

const index = (req, res) => {
  res.send("Index Page");
};

const login = (req, res) => {
  res.send("Login Page");
};

const changeCred = (req, res) => {
  res.send(" Chnge Cred Page");
};

const adminPanel = (req, res) => {
  res.send("Admin page");
};

const authLogin = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new BadRequestError("Please Provide Username and Password");
  }

  if (username !== "Admin") {
    throw new UnauthenticatedError("Invalid Credentials");
  }

  const admin = await Admin.findOne({ username });
  const isVerified = await admin.verifyPassword(password);
  if (!isVerified) {
    throw new UnauthenticatedError("Invalid Credentials");
  }

  const token = admin.createJWT();
  res.status(StatusCodes.OK).json({ token, msg: "Admin login Successful" });
};

const authChangeCred = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new BadRequestError("Please Provide Username and Password");
  }

  const admin = await Admin.findOneAndUpdate(
    { username },
    { password },
    { new: true, runValidators: true }
  );

  if (!admin) {
    throw new CustomAPIError(
      " Could not Udpdate Password:Error Occured Please Try again after sometime"
    );
  }

  const token = admin.createJWT();

  res.status(StatusCodes.OK).json({ token, msg: "Admin Credentials Changed" });
};

const createAdmin = async (req, res) => {
  const admin = await Admin.create({ ...req.body });
  const token = admin.createJWT();
  res.status(StatusCodes.CREATED).json({ token, msg: "Admin Created" });
};

module.exports = {
  index,
  login,
  changeCred,
  adminPanel,
  authLogin,
  authChangeCred,
};
