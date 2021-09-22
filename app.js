// imports
require("express-async-errors");
require("dotenv").config();
const express = require("express");
//secuirty imports

const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");

//connectDB
const connectDB = require("./utils/connect");

//custom imports
const sessionHandler = require("./utils/session");
const errorHandlerMiddleware = require("./middlewares/errorHandler");
const notFoundMiddleware = require("./middlewares/not-found");
const authentication = require("./middlewares/authentication");
const mainRouter = require("./routes/MainRouter");
const serviceRouter = require("./routes/serviceRouter");
const clientRouter = require("./routes/clientRouter");
const invoiceRouter = require("./routes/invoiceRouter");

//init app & config
const app = express();
app.set("view engine", "ejs");

//middlewares
app.use(express.json());
app.use(express.static(__dirname + "/public"));
app.use(sessionHandler());
/*
app.use(helmet());
app.use(cors());
app.use(xss());
app.use(
  rateLimiter({
    windowMs: 60 * 1000,
    max: 120,
  })
);
*/

//routes
app.use("/", mainRouter);
app.use("/admin/api/v1/service", authentication, serviceRouter);
app.use("/admin/api/v1/client", authentication, clientRouter);
app.use("/admin/api/v1/invoice", authentication, invoiceRouter);

//not found and error handler middlewares
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

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
