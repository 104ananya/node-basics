import express from "express"; // imported express module
import fs from "fs";
import path from "path";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import jwt  from "jsonwebtoken";

// DATABASE CONNECTION

const DB =
  "mongodb+srv://ananya:pandathedon@database01.3djalcx.mongodb.net/contact?retryWrites=true&w=majority";

mongoose
  .connect(DB)
  .then(() => {
    console.log("Database Successfully connected");
  })
  .catch((err) => console.log("no connection"));

// CREATING SCHEMA

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
});

const user = mongoose.model("Users", userSchema);

// IMPORTANT STEP
const app = express(); // server created

// express.static(path.join(path.resolve(), "public"));        // it is middleware

// middleware
app.use(express.static(path.join(path.resolve(), "public")));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// const users = [];      // storing in array


// setting the Engine
app.set("view engine", "ejs"); 

// using as middleware
const isAuthenticated = async (req, res, next) => {
  const { token } = req.cookies;

  
  if (token) {

    const decoded = jwt.verify(token, "adhkjsdka");
    // console.log(decoded)

    req.user = await user.findById(decoded._id);
    // console.log(req.user);

    next();
  } 
  else {
    res.render("login");
  }
};

app.get("/", isAuthenticated, (req, res) => {
  // res.render("index", { name: "Ananya" });

  // console.log(req.cookies);

  // const token = req.cookies.token;
  // console.log(token);

  res.render("logout");

  // if(token){
  //   res.render("logout");
  // }
  // else{
  //   res.render("login");
  // }

  // res.send("Hello");
  // res.status(400).send("Pandaaaa");        // chaining

  // res.sendStatus(404);

  // const file = fs.readFileSync("./index.html");

  // console.log(__dirname);      // can only be used when "type": "commonjs"

  // const pathlocation = path.resolve();

  // console.log(path.resolve());
  // console.log(path.join(pathlocation, "PANDA"));
  // res.sendFile(path.join(pathlocation, "./index.html"))

  // res.json({
  //     success: true,
  //     products : [],
  // });
});


// app.get("/add", async (req, res) => {
//   // await msg.create({ name: "Panda", email: "sample@gmail.com" });

//   res.send("Message sent successfully");
// });



// app.get("/success", (req, res) => {
//   // Route
//   res.render("success");
// });



// app.post("/contact", async (req, res) => {
//   console.log(req.body);

//   // const formData = ({ username: req.body.name, email: req.body.email });

//   await user.create({ name: req.body.name, email: req.body.email });

//   res.redirect("/success");
// });

// app.get("/users", (req, res) => {
//   API
//   res.json({
//     users,
//   });
// });

app.post("/login", async (req, res) => {

  // console.log(req.body);

  // let user = await user.findOne({email})

  // if(!user){
  //   // return console.log("Register First")
  //   res.redirect("/register");
  // }
  

  await user.create({ name: req.body.name, email: req.body.email });

  const token = jwt.sign({_id: user._id}, "adhkjsdka");
  // console.log(token);

  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + 60 * 1000),
  });


  res.redirect("/");
});

app.get("/logout", (req, res) => {
  res.cookie("token", null, {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.redirect("/");
});


app.get("/register", (req, res) => {
  
  res.render("register");
});


app.listen(5000, () => {
  console.log("Server is running on port: ", 5000);
  // call back function will be called only after executing server.listen
});
