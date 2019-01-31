const express = require("express");
const poemRoutes = require("./poems");

const router = express.Router();

// Home Page
router.get("/", (req, res) => {
  res.render("index");
});

// Poem routes
router.use("/poems", poemRoutes);

module.exports = router;
