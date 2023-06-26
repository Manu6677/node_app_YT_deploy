const express = require("express");
const fs = require("fs");
const morgan = require("morgan"); // It is a logger

const index = fs.readFileSync("index.html", "utf-8"); // index file read kri
const data = JSON.parse(fs.readFileSync("data.json", "utf-8")); // JSON data parse kia then neche fr json data m product access kia
const products = data.products;

const server = express();

// Very Important for body to be Parsed
server.use(express.json());
// To get static files if the name is index then only
server.use(express.static("public"));
// Logger
server.use(morgan("combined"));

// Read GET API
server.get("/products", (req, res) => {
  res.status(201).send(data);
});

// Read GET API by :id
server.get("/products/:id", (req, res) => {
  const id = req.params.id;
  const result = products.find((p) => p.id === +id);

  res.status(200).json(result);
});

server.post("/demo2", (req, res) => {
  console.log(req.body);
  const newProduct = products.push(req.body);
  res.status(200).json(newProduct);
});

server.put("/products/:id", (req, res) => {
  const id = req.params.id;
  const productIndex = products.findIndex((p) => p.id === +id);
  products.splice(productIndex, 1, { ...req.body, id: id });
  res.json({ updated: "Done Successfully" });
});

server.patch("/products/:id", (req, res) => {
  const id = +req.params.id;
  const productIndex = products.findIndex((p) => p.id === id);

  const product = products[productIndex]; // Here we got the actual product object b/c of Index
  products.splice(productIndex, 1, { ...product, ...req.body }); // Overwrite ho jaigi yaha original product with changed req.body
  res.status(201).json({ updated: "Done" });
});

server.delete("/products/:id", (req, res) => {
  const id = +req.params.id;
  const productIndex = products.findIndex((p) => p.id === id);
  const product = productIndex[products];

  products.splice(productIndex, 1);

  res.status(201).json(product);
});

server.listen(8080, () => {
  console.log("Server started");
});
