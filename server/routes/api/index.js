const router = require("express").Router();
const poemRoutes = require("./poems");

// Poem routes
router.use("/poems", poemRoutes);

module.exports = router;
