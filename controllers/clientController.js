const Client = require("../models/client");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError, CustomAPIError } = require("../errors");

const getAllClients = (req, res) => {
  res.send("Get All Client");
};

const getClient = async (req, res) => {
  const { email, phone } = req.body;
  let client;

  if (email) {
    client = await Client.findOne({ email });
  } else if (phone) {
    client = await Client.findOne({ phone });
  } else {
    throw new BadRequestError("Email or phone is can not be empty");
  }

  if (!client) {
    throw new NotFoundError("Client not found");
  }

  res.status(StatusCodes.OK).json({ client });
};

const createClient = async (req, res) => {
  const client = await Client.create(req.body);
  res.status(StatusCodes.CREATED).json({ client });
};

const updateClient = async (req, res) => {
  const { id: clientID } = req.params;
  const { name, email, phone, address } = req.body;

  if (!clientID) {
    throw new BadRequestError("Client ID is not Provided");
  }

  if (!name || !email || !address || !phone) {
    throw new BadRequestError("Update fields cannot be empty");
  }

  const client = await Client.findByIdAndUpdate(
    { _id: clientID },
    { name, email, address, phone },
    { runValidators: true, new: true }
  );

  if (!client) {
    throw new NotFoundError(`No client with ID ${clientID}`);
  }

  res.status(StatusCodes.OK).json({ client });
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
