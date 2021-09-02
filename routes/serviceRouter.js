const express = require("express");
const {
  getAllServices,
  getService,
  createService,
  updateService,
  deleteService,
} = require("../controllers/serviceController");

const router = express.Router();

router.route("/").get(getAllServices);
router
  .route("/:id")
  .get(getService)
  .post(createService)
  .patch(updateService)
  .delete(deleteService);

module.exports = router;
