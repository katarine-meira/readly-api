import express from "express";
import authMiddleware from "../../middlewares/auth.middleware.js";
import { getFeedController } from "./feed.controller.js";

const router = express.Router();

router.get("/", authMiddleware, getFeedController);

export default router;