"use strict";

const express = require("express"),
  app = express(),
  layouts = require("express-ejs-layouts"),
  methodOverride = require("method-override"),
  // expressSession = require("express-session"),
  // cookieParser = require("cookie-parser"),
  // connectFlash = require("connect-flash"),
  router = require("./routes/index");
