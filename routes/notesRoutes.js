"use strict";

const router = require("express").Router(),
  notesController = require("../controllers/notesController");

router.use(notesController.verifyJWT);
router.get("/", notesController.index, notesController.indexView);
router.post("/", notesController.create);
router.get("/delete/:id", notesController.delete);
router.post("/:id", notesController.update);



module.exports = router;
