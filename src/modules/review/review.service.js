import { createReview } from "./review.repository.js";
import { ensureMovieExists } from "../movie/movie.service.js";

const createReviewService = async (userId, tmdbId, rating, content) => {
    if(rating < 0 || rating > 5) {
        throw new Error("Nota deve ser entre 0 e 5");
    }

    //garante que o filme existe
    const movie = await ensureMovieExists(tmdbId);

    return createReview({
        userId,
        movieId: movie.id,
        rating,
        content
    });
};

export { createReviewService };