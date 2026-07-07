import express from "express";
import authMiddleware from "../../middlewares/auth.middleware.js";

import {
  createReviewController,
  deleteReviewController,
  getMyReviewsController,
  getUserReviewsController,
  updateReviewController,
} from "./review.controller.js";

const router = express.Router();

router.post("/", authMiddleware, createReviewController);

router.get("/me", authMiddleware, getMyReviewsController);
router.get("/user/:userId", getUserReviewsController);

router.patch("/:id", authMiddleware, updateReviewController);
router.delete("/:id", authMiddleware, deleteReviewController);

export default router;