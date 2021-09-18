const express = require("express");
const routeAccessControl = require("../middlewares/routeAccessControl");
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
router.route("/admin").get(routeAccessControl, adminPanel);
router.route("/admin/login").get(login).post(authLogin);
router
  .route("/admin/secret")
  .get(routeAccessControl, changeCred)
  .post(authChangeCred);

module.exports = router;
