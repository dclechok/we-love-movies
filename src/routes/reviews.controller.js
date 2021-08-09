const reviewsService = require("./reviews.service");
const asyncErrorBoundary = require("../../errors/asyncErrorBoundary");
const methodNotAllowed = require("../../errors/methodNotAllowed");

// MIDDLEWARE

async function reviewExists(req, res, next) {
  const review = await reviewsService.read(req.params.reviewId);
  if (review) {
    res.locals.review = review;
    return next();
  }
  next({ status: 404, message: `Review cannot be found` });
}

async function destroy(req, res) {
  await reviewsService.destroy(res.locals.review.review_id);
  res.sendStatus(204);
}

async function list(req, res) {
  const data = await reviewsService.list(req.params.movieId);
  res.json({ data });
}

async function update(req, res) {
  const updatedReview = {
    ...res.locals.review,
    ...req.body.data,
    review_id: res.locals.review.review_id,
  };
  const data = await reviewsService.update(updatedReview);
  res.json({ data });
}

module.exports = {
  destroy: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
  list: [asyncErrorBoundary(list)],
  update: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(update)],
};
