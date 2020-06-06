"use strict";

const express = require("express"),
  app = express(),
  layouts = require("express-ejs-layouts"),
  methodOverride = require("method-override"),
  //expressSession = require("express-session"),
  cookieParser = require("cookie-parser"),
  // connectFlash = require("connect-flash"),
  router = require("./routes/index"),
  axios = require("axios"),
  jwt = require("jsonwebtoken");


app.set("view engine", "ejs");
app.set("port", process.env.PORT || 4000);
app.use(
  express.urlencoded({
    extended: false
  })
);

app.use(express.json());
app.use(layouts);
app.use(express.static("public"));

app.use(methodOverride("_method", {
  methods: ["POST", "GET"]
}));

app.use(cookieParser("secret_passcode"));

app.use((req, res, next) => {
  // check if client sent cookie
  var cookie = req.cookies.authToken;
  if (cookie === undefined) {
    // no: set a new cookie
    res.locals.loggedIn = false;
    //res.cookie('cookieName',randomNumber, { maxAge: 900000, httpOnly: true });
    console.log('no cookie');
  } else {
    // yes, cookie was already present
    res.locals.loggedIn = true;
    console.log('cookie exists', cookie);
  }
  next();
});

app.use("/", router);

app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});


module.exports = app;
