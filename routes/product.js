const express = require("express");
const productRouter = express.Router();

const {
  getAll,
  getAllId,
  update,
  del,
  createNew,
  replace,
} = require("../product_controller/product");

// REST API
productRouter
  .get("/", getAll)
  .get("/:id", getAllId)
  .post("/", createNew)
  .put("/:id", update)
  .patch("/:id", replace)
  .delete("/:id", del);

module.exports = productRouter;
