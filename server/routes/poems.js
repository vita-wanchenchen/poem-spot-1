const router = require("express").Router();
const poemsController = require("../controllers/poemControllers");

// Matches with "/poems"
router.route("/")
  .get(poemsController.findAll)
  .post(poemsController.create);

// Matches with "/api/poems/:id"
router.route("/:id")
  .get(poemsController.findById)
  .put(poemsController.update)
  .delete(poemsController.remove);

module.exports = router;
