const fs = require("fs");

const model = require("../model/product");
const Product = model.Product;

const getAll = async (req, res) => {
  const product = await Product.find();
  res.status(201).send(product);
};

const getAllId = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const product = await Product.findById(id);
  console.log(product);
  res.status(200).json(product);
};

// This is a async and await fn and now does not take callBack and only in create new instance need to create
const createNew = async (req, res) => {
  try {
    const product = new Product(req.body); //APi ki body se lia data aur fr wahi database m dal dia by creating new instance of product and save krlia
    await product.save();
    res.status(200).json(product);
    console.log(product);
  } catch (err) {
    // console.log(err);
    // console.log(err?.errors?.discountPercentage?.properties?.message);
    res.status(400).json(err);
  }
};

const update = async (req, res) => {
  try {
    const id = req.params.id;
    const doc = await Product.findOneAndReplace({ _id: id }, req.body);
    res.status(200).json(doc);
  } catch (err) {
    res.status(400).json(err);
  }
};

// In replace there is a PUT request
const replace = async (req, res) => {
  try {
    const id = req.params.id;
    const doc = await Product.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    // console.log("replace");
    res.status(200).json(doc);
  } catch (err) {
    res.status(400).json(err);
  }
};

const del = async (req, res) => {
  try {
    const id = req.params.id;
    const doc = await Product.findOneAndDelete({ _id: id });
    res.status(200).json(doc);
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports = { getAll, getAllId, update, createNew, replace, del };
