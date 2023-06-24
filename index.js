const lib = require("./lib.js");
const fs = require("fs");

const t1 = performance.now();

// USE this it is a asynchronous process and does not bloack the server
fs.readFile("demo.txt", "utf-8", (err, txt) => {
  console.log(txt);
});

/**
 -Do not use fs.readFileSync because it block the server, it is synchronous process

   -const txt = fs.readFileSync("demo.txt", "utf-8");
   -console.log(txt);
 */

console.log(lib);
console.log(lib.sum(4, 6), lib.diff(10, 9));

const t2 = performance.now();

console.log(t2 - t1);
