const Admin = require("../models/admin");
const { StatusCodes } = require("http-status-codes");
const path = require("path");
const {
  BadRequestError,
  UnauthenticatedError,
  CustomAPIError,
} = require("../errors");

const index = (req, res) => {
  const filePath = path.resolve(__dirname + "/../views/index.html");
  return res.sendFile(filePath);
};

const login = (req, res) => {
  if (req.session.user && req.session.user.isAuth) {
    res.redirect("/");
  } else {
    const filePath = path.resolve(__dirname + "/../views/login.html");
    return res.sendFile(filePath);
  }
};

const changeCred = (req, res) => {
  const filePath = path.resolve(__dirname + "/../views/secret.html");
  return res.sendFile(filePath);
};

const adminPanel = (req, res) => {
  const filePath = path.resolve(__dirname + "/../views/adminPanel.html");
  res.sendFile(filePath);
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
  const user = {
    userID: "Admin",
    isAuth: true,
    isAdmin: true,
  };
  const day = 24 * 60 * 60 * 1000;
  req.session.cookie.expires = new Date(Date.now() + day);
  req.session.cookie.maxAge = day;
  req.session.user = { ...user };
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
