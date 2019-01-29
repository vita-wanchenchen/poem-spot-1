const router = require("express").Router();
const poemRoutes = require("./poems");

// Home Page
router.get("/", (req, res) => {
  res.render("index");
});

router.use("/poems", poemRoutes);


module.exports = router;
