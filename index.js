const express = require("express");
const fs = require("fs");
const morgan = require("morgan");

const index = fs.readFileSync("index.html", "utf-8");

const data = JSON.parse(fs.readFileSync("data.json", "utf-8"));
const products = data.products;

const server = express();

server.use((req, res, next) => {
  console.log(
    req.method,
    req.ip,
    req.hostname,
    req.url,
    new Date(),
    req.get("User-Agent")
  );
  next();
});

server.use(express.json());
server.use(express.static("public"));
server.use(morgan("default"));

const auth = (req, res, next) => {
  //console.log(req.query);
  if (req.body.q === "123") {
    next();
  } else {
    res.status(401).send();
  }
};

//server.use(auth);
server.get("/demo", auth, (req, res) => {
  // res.send("manu");
  //res.json(data);
  res.status(201).send(data);
});

server.post("/demo2", auth, (req, res) => {
  res.status(201).send(data);
});

server.delete("/demo3", auth, (req, res) => {
  res.status(201).send(data);
});

server.patch("/demo4", auth, (req, res) => {
  res.status(201).send(data);
});

server.listen(8080, () => {
  console.log("Server started");
});
