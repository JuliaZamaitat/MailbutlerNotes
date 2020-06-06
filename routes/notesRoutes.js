"use strict";

const router = require("express").Router(),
  notesController = require("../controllers/notesController");

router.use(notesController.verifyJWT);
router.get("/", notesController.index);


module.exports = router;
