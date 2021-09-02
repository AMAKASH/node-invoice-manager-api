const getAllClients = (req, res) => {
  res.send("Get All Client");
};

const getClient = (req, res) => {
  res.send("Get single client");
};

const createClient = (req, res) => {
  res.send("Create Client");
};

const updateClient = (req, res) => {
  res.send("update Client");
};

const deleteClient = (req, res) => {
  res.send("Delete Client");
};

module.exports = {
  getAllClients,
  getClient,
  createClient,
  updateClient,
  deleteClient,
};
