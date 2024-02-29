import { Router } from "express";

// Services
import getReviews from "../services/reviews/getReviews.js";
import createReview from "../services/reviews/createReview.js";
import getReviewById from "../services/reviews/getReviewById.js";
import updateReviewById from "../services/reviews/updateReviewById.js";
import deleteReview from "../services/reviews/deleteReview.js";

// Middleware
import authMiddleware from "../middleware/auth.js";
import notFoundErrorHandler from "../middleware/notFoundErrorHandler.js";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const { userId, propertyId, rating, comment } = req.query;
    const reviews = await getReviews(userId, propertyId, rating, comment);
    res.status(200).json(reviews);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const review = await getReviewById(id);

    if (review) {
      res.status(200).json(review);
    } else {
      res.status(404).json({ message: `Review with id ${id} was not found` });
    }
  } catch (error) {
    next(error);
  }
});

router.post("/", authMiddleware, async (req, res, next) => {
  try {
    const { userId, propertyId, rating, comment } = req.body;
    const newReview = await createReview(userId, propertyId, rating, comment);

    if (newReview) {
      res.status(200).json(newReview);
    } else {
      res.status(404).json({ message: `Review with id ${id} was not found` });
    }
  } catch (error) {
    next(error);
  }
});

router.put("/:id", authMiddleware, async (req, res, next) => {
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
    if (updatedReview) {
      res.status(200).json(updatedReview);
    } else {
      res.status(404).json({ message: `Review with id ${id} was not found` });
    }
  } catch (error) {
    next(error);
  }
  notFoundErrorHandler;
});

router.delete("/:id", authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedReviewId = await deleteReview(id);

    if (deletedReviewId) {
      res.status(200).json({
        message: `Review with id ${deletedReviewId} was deleted!`,
      });
    } else {
      res.status(404).json({ message: `Review with id ${id} was not found` });
    }
  } catch (error) {
    next(error);
  }
  notFoundErrorHandler;
});

export default router;
