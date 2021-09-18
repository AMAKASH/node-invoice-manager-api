const Service = require("../models/service");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError, CustomAPIError } = require("../errors");

const getAllServices = async (req, res) => {
  const service = await Service.find({}).sort("name");
  res.status(StatusCodes.OK).json({ service, nbHits: service.length });
};

const getService = async (req, res) => {
  const { id: serviceID } = req.params;

  if (!serviceID) {
    throw new BadRequestError("Service ID can not be Empty");
  }
  const service = await Service.findById(serviceID);
  if (!service) {
    throw new NotFoundError(`No service by ID ${serviceID}`);
  }
  res.status(StatusCodes.OK).json({ service });
};

const createService = async (req, res) => {
  const service = await Service.create(req.body);
  res.status(StatusCodes.CREATED).json({ service });
};

const updateService = async (req, res) => {
  const { id: serviceID } = req.params;
  const service = await Service.findOneAndUpdate({ _id: serviceID }, req.body, {
    runValidators: true,
    new: true,
  });
  if (!service) {
    throw new NotFoundError(`No service by ID ${serviceID}`);
  }
  res.status(StatusCodes.OK).json({ service });
};

const deleteService = async (req, res) => {
  const { id: serviceID } = req.params;
  const service = await Service.findOneAndDelete({ _id: serviceID });
  if (!service) {
    throw new NotFoundError(`No service by ID ${serviceID}`);
  }
  res.status(StatusCodes.OK).json({ service });
};

module.exports = {
  getAllServices,
  getService,
  createService,
  updateService,
  deleteService,
};
