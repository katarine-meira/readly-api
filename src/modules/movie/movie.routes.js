import express from "express";
import {
  getMovieDetailsController,
  getMoviesController,
} from "./movie.controller.js";

const router = express.Router();

router.get("/", getMoviesController);
router.get("/:tmdbId", getMovieDetailsController);

export default router;