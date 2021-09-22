const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema(
  {
    prefix: {
      type: String,
      required: [true, "Please Enter Invoice Prefix"],
    },
    number: {
      type: Number,
      required: [true, "Invoice Number not Found"],
      unique: true,
    },
    items: {
      type: [
        {
          serviceID: {
            type: mongoose.Types.ObjectId,
            ref: "Service",
            required: [true, "Please Provide Service ID"],
          },
          quantity: {
            type: Number,
            required: [true, "Please provide Quantity"],
          },
        },
      ],
      default: [],
    },
    clientID: {
      type: mongoose.Types.ObjectId,
      ref: "Client",
      required: [true, "Please provide Client ID"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Invoice", invoiceSchema);
