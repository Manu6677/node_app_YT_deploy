require("dotenv").config();
const express = require("express");

const mongoose = require("mongoose");

const morgan = require("morgan"); // It is a logger

const routes = require("./routes/product");
const userRoutes = require("./routes/user");

const server = express();

//db connection
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/ecommerce");
  console.log("dataBase connected");
}

// Very Important for body to be Parsed
server.use(express.json());
// To get static files if the name is index then only
server.use(express.static(process.env.PUBLIC_DIR));
// Logger
server.use(morgan("combined"));
//Router attached to server now
server.use("/products/api", routes);
server.use("/user/api", userRoutes);

server.listen(process.env.PORT, () => {
  console.log("Server started");
});
