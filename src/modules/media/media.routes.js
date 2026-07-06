import express from "express";
import {
  getAllMediasController,
  getMediaByIdController,
} from "./media.controller.js";

const router = express.Router();

router.get("/", getAllMediasController);
router.get("/:id", getMediaByIdController);

export default router;