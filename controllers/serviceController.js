const getAllServices = (req, res) => {
  res.send("Get All Services");
};

const getService = (req, res) => {
  res.send("Get single Service");
};

const createService = (req, res) => {
  res.send("Create Service");
};

const updateService = (req, res) => {
  res.send("update Service");
};

const deleteService = (req, res) => {
  res.send("Delete Service");
};

module.exports = {
  getAllServices,
  getService,
  createService,
  updateService,
  deleteService,
};
