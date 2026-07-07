import express from "express";
import authMiddleware from "../../middlewares/auth.middleware.js";
import {
  addMediaUserStatusController,
  getMyMediaStatusesController,
  removeMediaUserStatusController,
} from "./media-user.controller.js";

const router = express.Router();

router.post("/", authMiddleware, addMediaUserStatusController);
router.get("/me", authMiddleware, getMyMediaStatusesController);
router.delete("/:mediaId/:status", authMiddleware, removeMediaUserStatusController);

export default router;