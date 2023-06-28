const fs = require("fs");

const data = JSON.parse(fs.readFileSync("data.json", "utf-8")); // JSON data parse kia then neche fr json data m product access kia
const user = data.users;
// console.log(products);

const getAll = (req, res) => {
  res.status(201).send(user);
};

const getAllId = (req, res) => {
  const id = req.params.id;
  const result = user.find((p) => p.id === +id);

  res.status(200).json(result);
};

const createNew = (req, res) => {
  console.log(req.body);
  const newProduct = user.push(req.body);
  res.status(200).json(newProduct);
};

const update = (req, res) => {
  const id = req.params.id;
  const productIndex = user.findIndex((p) => p.id === +id);
  user.splice(productIndex, 1, { ...req.body, id: id });
  res.json({ updated: "Done Successfully" });
};

const replace = (req, res) => {
  const id = +req.params.id;
  const productIndex = user.findIndex((p) => p.id === id);

  const product = user[productIndex]; // Here we got the actual product object b/c of Index
  user.splice(productIndex, 1, { ...product, ...req.body }); // Overwrite ho jaigi yaha original product with changed req.body
  res.status(201).json({ updated: "Done" });
};

const del = (req, res) => {
  const id = +req.params.id;
  const productIndex = user.findIndex((p) => p.id === id);
  const product = productIndex[user];

  user.splice(productIndex, 1);

  res.status(201).json(product);
};

module.exports = { getAll, getAllId, update, createNew, replace, del };
