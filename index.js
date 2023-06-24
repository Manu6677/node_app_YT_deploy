const http = require("http");
const fs = require("fs");

const index = fs.readFileSync("index.html", "utf-8");

const data = JSON.parse(fs.readFileSync("data.json", "utf-8"));
const products = data.products;

const server = http.createServer((req, res) => {
  console.log(req.url, req.method);

  if (req.url.startsWith("/product")) {
    const id = req.url.split("/")[2];
    const prd = products.find((p) => p.id === +id); //Rem. no curly braces on p.id === +id
    // and +id is + covert from string to number
    res.setHeader("Content-Type", "text/html");
    let modifiedIndex = index
      .replace("**title**", prd.title)
      .replace("**price**", prd.price)
      .replace("**url**", prd.thumbnail)
      .replace("**rating**", prd.rating);
    res.end(modifiedIndex);

    return;
  }

  switch (req.url) {
    case "/":
      res.setHeader("Content-Type", "text/html");
      res.end(index);
      break;
    case "/api":
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(data));
      break;
    case "/product":
      res.setHeader("Content-Type", "text/html");
      let modifiedIndex = index
        .replace("**title**", products.title)
        .replace("**price**", products.price)
        .replace("**url**", products.thumbnail)
        .replace("**rating**", products.rating);
      res.end(modifiedIndex);
      break;
    default:
      res.writeHead(404, "NT FOUND");
      res.end();
  }

  console.log("server started");
  // res.setHeader("Content-Type", "text/html");
  // res.setHeader("Content-Type", "application/json");
  // res.end(index);
});

server.listen(8080);
