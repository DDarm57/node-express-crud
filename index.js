const express = require("express");
const app = express();
var methodOverride = require("method-override");
const usersRouter = require("./router/users");

const port = 3000;

var myLogger = function (req, res, next) {
  console.log("LOGGER");
  next();
};
// Tambahkan middleware method-override
app.use(methodOverride("_method"));
const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/belajar_express");

try {
  console.log("connection mongodb success");
} catch (error) {
  handleError(error);
}

app.use(myLogger);
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index");
});
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(usersRouter);

app.get("/about", (req, res) => {
  res.render("about");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
