const express = require("express");
const app = express();
const users = require("./routes/user");
const posts = require("./routes/post");
const session = require("express-session");
const flash = require("connect-flash");
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const sessionOptions = {
  secret: "mysecret",
  resave: false,
  saveUninitialized: true,
};

app.use(session(sessionOptions));
app.use(flash());

app.get("/register", (req, res) => {
  let { name = "anonymous" } = req.query;
  req.session.name = name;
  req.flash("success", "User registed successfully");
  res.redirect("/hello");
});

app.get("/hello", (req, res) => {
  res.render("page.ejs", { name: req.session.name, msg: req.flash("success") });
});

app.get("/", (req, res) => {
  res.send("Hi, I am root");
});

app.use("/users", users);
app.use("/posts", posts);

app.listen(3000, () => {
  console.log("Server is listening to 3000");
});
