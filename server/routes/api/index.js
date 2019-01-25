const router = require("express").Router();
const poemRoutes = require("./poems");
const userRoutes = require("./users");

// Poem routes
router.use("/poems", poemRoutes);
router.use("/users", userRoutes);

module.exports = router;
