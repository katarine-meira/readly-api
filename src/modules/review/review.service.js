import { createReview } from "./review.repository.js";
import { ensureMovieExists } from "../movie/movie.service.js";

const createReviewService = async ({ userId, tmdbId, mediaId, rating, content }) => {
  if (rating < 0 || rating > 5) {
    throw new Error("Nota deve ser entre 0 e 5");
  }

  if (!content) {
    throw new Error("Conteúdo da review é obrigatório");
  }

  let finalMediaId = mediaId;

  if (!finalMediaId && tmdbId) {
    const movie = await ensureMovieExists(Number(tmdbId));
    finalMediaId = movie.id;
  }

  if (!finalMediaId) {
    throw new Error("Informe o mediaId ou tmdbId");
  }

  return createReview({
    userId,
    mediaId: finalMediaId,
    rating,
    content,
  });
};

export { createReviewService };