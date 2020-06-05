"use strict";

const express = require("express"),
  app = express(),
  layouts = require("express-ejs-layouts"),
  methodOverride = require("method-override"),
  // expressSession = require("express-session"),
  // cookieParser = require("cookie-parser"),
  // connectFlash = require("connect-flash"),
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

app.use(methodOverride("_method", {
  methods: ["POST", "GET"]
}));

app.use("/", router);

app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});
