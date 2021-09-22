const Invoice = require("../models/invoice");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError, CustomAPIError } = require("../errors");

const getAllInvoice = async (req, res) => {
  const invoice = await Invoice.find({}).sort("createdAt");
  res.status(StatusCodes.OK).json({ invoice, nbHits: invoice.length });
};

const getInvoice = async (req, res) => {
  const { id: invoiceID } = req.params;
  const number = invoiceID.split("-")[2];
  const prefix = invoiceID.split("-").slice(0, 2).join("-");

  const invoice = await Invoice.findOne({ number, prefix });
  if (!invoice) {
    throw new NotFoundError(`No invoices by ID ${invoiceID}`);
  }
  res.status(StatusCodes.OK).json({ invoice });
};

const getInvoiceByClient = async (req, res) => {
  const { id: clientID } = req.params;

  const invoice = await Invoice.find({ clientID }).sort("createdAt");
  if (!invoice) {
    throw new NotFoundError(`No invoices by Client ID ${clientID}`);
  }
  res.status(StatusCodes.OK).json({ invoice, nbHits: invoice.length });
};

const createInvoice = async (req, res) => {
  const { clientID } = req.body;
  const lastInvoice = await Invoice.find({ clientID }).sort("-number").limit(1);
  const d = new Date();
  let number = (d.getFullYear() - 2000) * 100 + 1;
  console.log("log->>>>>", lastInvoice);
  if (lastInvoice) {
    number = lastInvoice[0].number + 1;
  }
  const invoice = await Invoice.create({ ...req.body, number });
  res.status(StatusCodes.CREATED).json({ invoice });
};

const updateInvoice = async (req, res) => {
  const { id: invoiceID } = req.params;
  const invoice = await Invoice.findByIdAndUpdate(invoiceID, req.body, {
    runValidators: true,
    new: true,
  });
  if (!invoice) {
    throw new NotFoundError(`No invoices by ID${invoiceID}`);
  }
  res.status(StatusCodes.OK).json({ invoice });
};

const deleteInvoice = async (req, res) => {
  const { id: invoiceID } = req.params;
  const invoice = await Invoice.findByIdAndDelete(invoiceID);
  if (!invoice) {
    throw new NotFoundError(`No invoices by ID${invoiceID}`);
  }
  res.status(StatusCodes.OK).json({ invoice });
};

module.exports = {
  getAllInvoice,
  getInvoice,
  createInvoice,
  updateInvoice,
  deleteInvoice,
  getInvoiceByClient,
};
