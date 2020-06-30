require("dotenv").config();
const express = require("express");
//const flash = require("flash-express");
const session = require("express-session");
const passport = require("passport");

const app = express();
app.set("view engine", "ejs");

const http = require("http").Server(app);
const io = require("socket.io");
const socket = io(http);

//passport config
require("./src/config/passport")(passport);

//DataBase connection
const db = require("./src/database/database");
app.listen(db);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Extend session
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

//connect Flash
//app.use(flash);

//global vars
//app.use((req, res, next) => {
//    res.locals.success_msg = req.flash('success_msg');
//    res.locals.error_msg = req.flash('error_msg');
//    res.locals.error = req.flash('error');
//   next();
//})

socket.on("connection", (socket) => {
  console.log("user connected");
});

const routes = require("./src/middleware/middlewares");
app.use(routes);

app.listen(5000, () => console.log("Server started"));
