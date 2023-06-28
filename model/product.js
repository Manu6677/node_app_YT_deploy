const mongoose = require("mongoose");
const { Schema } = mongoose;

//Schema
const productSchema = new Schema({
  title: { type: String, required: true },
  description: String,
  price: { type: Number, min: [0, "Wrong Min price"], required: true },
  discountPercentage: {
    type: Number,
    min: [0, "Wrong Min discount"],
    max: [50, "Wrong Max Rating"],
  },
  rating: {
    type: Number,
    min: [0, "Wrong Min rating"],
    max: [6, "wrong Max rating"],
  },
  brand: { type: String, required: true },
  category: { type: String, required: true },
  thumbnail: { type: String, required: true },
  images: [String],
});
// Yaha const product hie deal krega database se
// Yaha pe model MVC wala model hi hai jiska use krke collection banainge aur schema uss collection ki configuration hai
// Neche bata rha hai Product collection ka Schema productSchema hai
// Product const wala hie deal krega abse database se aur esko Controller m import krlo waha
exports.Product = mongoose.model("Product", productSchema);
