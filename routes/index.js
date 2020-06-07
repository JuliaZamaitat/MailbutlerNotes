"use strict";

const router = require("express").Router(),
   homeRoutes = require("./homeRoutes"),
   userRoutes = require("./userRoutes"),
   notesRoutes = require("./notesRoutes");

router.use("/", homeRoutes);
router.use("/users", userRoutes);
router.use("/notes", notesRoutes);

module.exports = router;
