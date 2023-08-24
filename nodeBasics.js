// const http = require("http");
import http, { METHODS } from 'http'
// console.log(http);


import * as myObj from './features.js';

console.log(myObj.default, myObj.name2, myObj.name3);

console.log(myObj.lovePercent())

// import diffname from "./features.js";
// console.log(diffname);

// import { name2, name3 } from './features.js';
// console.log(name2, name3);


import fs from 'fs';

const home = fs.readFile("./index.html", () =>{
  console.log("File read successfully");
});


const server = http.createServer((req, res) => {
  // console.log(req.url);

  console.log(req.method);

  if (req.url === "/") {
    res.end(`<h1>Love percentage is ${myObj.lovePercent()}</h1>`);
    
  }
  else if (req.url === "/contact") {
    res.end("<h1>Contact Page</h1>");
  }

  else if (req.url === "/about") {
    res.end("<h1>About Page</h1>");
  } else {
    res.end("page not found");
  }
});

server.listen(5000, () => {
  console.log(`Listening on port 5000`);
});
