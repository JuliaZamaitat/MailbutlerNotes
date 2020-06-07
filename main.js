"use strict";

const express = require("express"),
  app = express(),
  layouts = require("express-ejs-layouts"),
  expressSession = require("express-session"),
  cookieParser = require("cookie-parser"),
  connectFlash = require("connect-flash"),
  jwt = require("jsonwebtoken"),
  keygen = require("keygenerator"),
  router = require("./routes/index");

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

const sessionID = keygen.session_id()
app.use(cookieParser(sessionID));
app.use(expressSession({ 
  secret: sessionID,
  cookie: {
    maxAge: 4000000
  },
  resave: false,
  saveUninitialized: false
}));
app.use(connectFlash());

app.use((req, res, next) => {
  res.locals.flashMessages = req.flash();
  let cookies = req.cookies;
  if (cookies){
    let token = cookies.authToken;
    if (!token) {
      res.locals.loggedIn = false;
    } else {
      res.locals.loggedIn = true;
    }
  }
  next();
});

app.use("/", router);

app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});


module.exports = app;
