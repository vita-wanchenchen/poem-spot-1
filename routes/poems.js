const router = require("express").Router();
const poemController = require("../controllers/poemControllers");

// Matches with "/api/poems"
router.route("/api/poems")
  .get(poemController.findAll)
  .post(poemController.create);

// Matches with "/api/poems/:id"
router
  .route("/:id")
  .get(poemController.findById)
  .put(poemController.update)
  .delete(poemController.remove);

module.exports = router;
