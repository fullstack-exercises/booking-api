import { Router } from "express";

// Services
import getReviews from "../services/reviews/getReviews.js";
import createReview from "../services/reviews/createReview.js";
import getReviewById from "../services/reviews/getReviewById.js";
import updateReviewById from "../services/reviews/updateReviewById.js";
import deleteReview from "../services/reviews/deleteReview.js";

const router = Router();

router.get("/", async (req, res) => {
  const { userId, propertyId, rating, comment } = req.query;
  const reviews = await getReviews(userId, propertyId, rating, comment);
  res.status(200).json(reviews);
});

router.post("/", async (req, res) => {
  const { userId, propertyId, rating, comment } = req.body;
  const newReview = await createReview(userId, propertyId, rating, comment);
  res.status(201).json(newReview);
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const review = await getReviewById(id);

    res.status(200).json(review);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { userId, propertyId, rating, comment } = req.body;
    const updatedReview = await updateReviewById(
      id,
      userId,
      propertyId,
      rating,
      comment
    );
    res.status(200).json(updatedReview);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedReviewId = await deleteReview(id);

    res.status(200).json({
      message: `Review with id ${deletedReviewId} was deleted!`,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
