const express = require("express");
const {
  getAllInvoice,
  getInvoice,
  createInvoice,
  updateInvoice,
  deleteInvoice,
  getInvoiceByClient,
} = require("../controllers/invoiceController");

const router = express.Router();

router.route("/").get(getAllInvoice).post(createInvoice);
router.route("/:id").get(getInvoice).patch(updateInvoice).delete(deleteInvoice);

router.route("/byClient/:id").get(getInvoiceByClient);

module.exports = router;
