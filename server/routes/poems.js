const router = require("express").Router();
const poemsController = require("../controllers/poemControllers");

// Matches with "/poems"
router.route("/")
  .get(poemsController.findAll)
  // .get(poemsController.findUser)
  .post(poemsController.create);

router.route("/self")
  .get(poemsController.findUser);

// Matches with "/api/poems/:id"
router.route("/:id")
  .get(poemsController.findById)
  .put(poemsController.update)
  .delete(poemsController.remove);

module.exports = router;
