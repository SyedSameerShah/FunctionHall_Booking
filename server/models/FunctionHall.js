const mongoose = require("mongoose");

const hallSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.ObjectId,
    name: String,
    price: Number,
    occupency: String,
    discription: String,
    cuisine: String,
    location: {
      city: String,
      state: String,
    },
    bookings: [Date],
  },
  { collection: "FunctionHall" }
);

const FunctionHall = mongoose.model("FunctionHall", hallSchema);

module.exports = { FunctionHall };
