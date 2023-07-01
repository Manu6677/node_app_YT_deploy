require("dotenv").config();
const express = require("express");

const mongoose = require("mongoose");

const morgan = require("morgan"); // It is a logger
const path = require("path");

const routes = require("./routes/product");
const cors = require("cors");
const userRoutes = require("./routes/user");

const server = express();

//db connection
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
  console.log("dataBase connected");
}

// cors enabled
server.use(cors());
// Very Important for body to be Parsed
server.use(express.json());
// To get static files if the name is index then only
server.use(express.static(path.resolve(__dirname, process.env.PUBLIC_DIR)));
// Logger
server.use(morgan("combined"));
//Router attached to server now
server.use("/products/api", routes);
server.use("/user/api", userRoutes);

// To access the react routes and uses the path by requiring
server.use("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "build", "index.html"));
});

server.listen(process.env.PORT, () => {
  console.log("Server started");
});
