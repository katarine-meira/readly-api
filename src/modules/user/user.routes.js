import express from "express";
import {
  login,
  register,
  me,
  getPublicUserProfile,
  searchUsers,
} from "./user.controller.js";
import authMiddleware from "../../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.get("/me", authMiddleware, me);
router.get("/", authMiddleware, searchUsers);

router.get("/:id", getPublicUserProfile);

export default router;