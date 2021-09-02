const express = require("express");
const {
  getAllInvoice,
  getInvoice,
  createInvoice,
  updateInvoice,
  deleteInvoice,
} = require("../controllers/invoiceController");

const router = express.Router();

router.route("/").get(getAllInvoice);
router
  .route("/:id")
  .get(getInvoice)
  .post(createInvoice)
  .patch(updateInvoice)
  .delete(deleteInvoice);

module.exports = router;
