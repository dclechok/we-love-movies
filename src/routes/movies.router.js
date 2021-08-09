
const router = require("express").Router();
const controller = require("./movies.controller");
const methodNotAllowed = require("../../errors/methodNotAllowed");
const notFound = require("../../errors/notFound");

router.route("/:movieId/reviews").get(controller.readReviews).all(methodNotAllowed);
router.route("/:movieId/theaters").get(controller.readTheaters).all(methodNotAllowed);
router.route("/:movieId/critics").all(notFound);
router.route("/:movieId").get(controller.read).all(methodNotAllowed);
router.route("/").get(controller.list).all(methodNotAllowed);

module.exports = router;