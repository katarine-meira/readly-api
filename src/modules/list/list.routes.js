import express from "express";
import authMiddleware from "../../middlewares/auth.middleware.js";

import {
  addMediaToListController,
  createListController,
  deleteListController,
  getMyListsController,
  getPublicUserListsController,
  removeMediaFromListController,
  updateListController,
} from "./list.controller.js";

const router = express.Router();

router.post("/", authMiddleware, createListController);

router.get("/me", authMiddleware, getMyListsController);

router.get("/user/:userId/public", getPublicUserListsController);

router.patch("/:listId", authMiddleware, updateListController);

router.delete("/:listId", authMiddleware, deleteListController);

router.post("/:listId/items", authMiddleware, addMediaToListController);

router.delete(
  "/:listId/items/:mediaId",
  authMiddleware,
  removeMediaFromListController
);

export default router;