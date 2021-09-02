const getAllInvoice = (req, res) => {
  res.send("Get All Invoice");
};

const getInvoice = (req, res) => {
  res.send("Get single Invoice");
};

const createInvoice = (req, res) => {
  res.send("Create Invoice");
};

const updateInvoice = (req, res) => {
  res.send("update Invoice");
};

const deleteInvoice = (req, res) => {
  res.send("Delete Invoice");
};

module.exports = {
  getAllInvoice,
  getInvoice,
  createInvoice,
  updateInvoice,
  deleteInvoice,
};
