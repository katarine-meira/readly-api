import express from "express"
//import authMiddleware from "../../middlewares/auth.middleware.js";
import { getMovieDetailsController, getMoviesController } from "./movie.controller.js";

const router = express.Router();

router.get("/:tmdbId", getMovieDetailsController);
router.get("/", getMoviesController);

export default router