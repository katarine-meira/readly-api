import express from "express";

import userRoutes from "../modules/user/user.routes.js";
import movieRoutes from "../modules/movie/movie.routes.js";
import bookRoutes from "../modules/book/book.routes.js";
import mediaRoutes from "../modules/media/media.routes.js";
import reviewRoutes from "../modules/review/review.routes.js";
import listRoutes from "../modules/list/list.routes.js";
import followRoutes from "../modules/follow/follow.routes.js";
import mediaUserRoutes from "../modules/media-user/media-user.routes.js";
import feedRoutes from "../modules/feed/feed.routes.js";

const router = express.Router();

router.use("/users", userRoutes);
router.use("/movies", movieRoutes);
router.use("/books", bookRoutes);
router.use("/media", mediaRoutes);
router.use("/reviews", reviewRoutes);
router.use("/lists", listRoutes);
router.use("/follow", followRoutes);
router.use("/media-user", mediaUserRoutes);
router.use("/feed", feedRoutes);

export default router;