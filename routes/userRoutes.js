"use strict";

const router = require("express").Router(),
  usersController = require("../controllers/usersController");

router.post("/login", usersController.login);
router.get("/logout", usersController.logout);

module.exports = router;
