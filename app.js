// imports
require("express-async-errors");
require("dotenv").config();

//connectDB
const connectDB = require("./db/connect");

//custom imports
const notFoundMiddleware = require("./middlewares/not-found");
const authentication = require("./middlewares/authentication");
const mainRouter = require("./routes/MainRouter");
const serviceRouter = require("./routes/serviceRouter");
const clientRouter = require("./routes/clientRouter");
const invoiceRouter = require("./routes/invoiceRouter");

const express = require("express");
const app = express();

//middlewares
app.use(express.json());
app.use(express.static(__dirname + "/public"));

//routes
app.use("/", mainRouter);
app.use("/admin/api/v1/service", authentication, serviceRouter);
app.use("/admin/api/v1/client", authentication, clientRouter);
app.use("/admin/api/v1/invoice", authentication, invoiceRouter);

//not found and error handler middlewares
app.use(notFoundMiddleware);

//initialiting db & server
const port = process.env.PORT || 3050;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(
      port,
      console.log(`Server in Listening in port ${port}.............`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
