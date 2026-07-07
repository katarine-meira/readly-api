import express from "express";
import authMiddleware from "../../middlewares/auth.middleware.js";
import {
  followUserController,
  getFollowersController,
  getFollowingController,
  unfollowUserController,
} from "./follow.controller.js";

const router = express.Router();

router.post("/:userId", authMiddleware, followUserController);
router.delete("/:userId", authMiddleware, unfollowUserController);

router.get("/:userId/followers", getFollowersController);
router.get("/:userId/following", getFollowingController);

export default router;