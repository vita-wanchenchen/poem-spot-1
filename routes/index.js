const router = require("express").Router();
const poemRoutes = require("./poems");
const apiRoutes = require("./poems");

// Home Page
router.get("/", (req, res) => {
  res.render("index");
});

router.use("/poems", poemRoutes);
router.use("/api", apiRoutes);

module.exports = router;
