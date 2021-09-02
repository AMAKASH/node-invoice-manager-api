const express = require("express");
const authentication = require("../middlewares/authentication");
const {
  index,
  login,
  changeCred,
  adminPanel,
  authLogin,
  authChangeCred,
} = require("../controllers/MainController");

const router = express.Router();

router.route("/").get(index).post(index);
router.route("/admin").get(authentication, adminPanel);
router.route("/admin/login").get(login).post(authLogin);
router.route("/admin/secret").get(changeCred).post(authChangeCred);

module.exports = router;
