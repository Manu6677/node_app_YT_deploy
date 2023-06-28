const express = require("express");
const userRouter = express.Router();

const {
  getAll,
  getAllId,
  update,
  del,
  createNew,
  replace,
} = require("../product_controller/user");

// REST API
userRouter
  .get("/", getAll)
  .get("/:id", getAllId)
  .post("/", createNew)
  .put("/:id", update)
  .patch("/:id", replace)
  .delete("/:id", del);

module.exports = userRouter;
