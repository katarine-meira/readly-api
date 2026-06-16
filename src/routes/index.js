import express from "express"
import userRoutes from "../modules/user/user.routes.js"
import reviewRoutes from "../modules/review/review.routes.js"
import moviesRoutes from "../modules/movie/movie.routes.js"

const routes = express.Router();

routes.use("/users", userRoutes);
routes.use("/reviews", reviewRoutes);
routes.use("/movies", moviesRoutes);

export default routes;