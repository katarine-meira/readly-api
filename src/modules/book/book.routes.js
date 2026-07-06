import express from "express";
import {
  getBookDetailsController,
  getBooksController,
} from "./book.controller.js";

const router = express.Router();

router.get("/", getBooksController);
router.get("/:googleBooksId", getBookDetailsController);

export default router;