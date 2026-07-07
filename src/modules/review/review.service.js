import {
  createReview,
  deleteReview,
  findReviewById,
  findReviewsByUserId,
  findUserReviewByMediaId,
  updateReview,
} from "./review.repository.js";

import { ensureMovieExists } from "../movie/movie.service.js";

const validateRating = (rating) => {
  const numericRating = Number(rating);

  if (Number.isNaN(numericRating)) {
    throw new Error("Nota inválida");
  }

  if (numericRating < 0 || numericRating > 5) {
    throw new Error("Nota deve ser entre 0 e 5");
  }

  return numericRating;
};

const createReviewService = async ({ userId, tmdbId, mediaId, rating, content }) => {
  const numericRating = validateRating(rating);

  if (!content || content.trim() === "") {
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

  const alreadyReviewed = await findUserReviewByMediaId({
    userId,
    mediaId: finalMediaId,
  });

  if (alreadyReviewed) {
    throw new Error("Você já avaliou essa mídia");
  }

  return createReview({
    userId,
    mediaId: finalMediaId,
    rating: numericRating,
    content: content.trim(),
  });
};

const getMyReviewsService = async (userId) => {
  return findReviewsByUserId(userId);
};

const getUserReviewsService = async (userId) => {
  return findReviewsByUserId(userId);
};

const updateReviewService = async ({ reviewId, userId, rating, content }) => {
  const review = await findReviewById(reviewId);

  if (!review) {
    throw new Error("Review não encontrada");
  }

  if (review.userId !== userId) {
    throw new Error("Você não pode editar essa review");
  }

  const data = {};

  if (rating !== undefined) {
    data.rating = validateRating(rating);
  }

  if (content !== undefined) {
    if (!content || content.trim() === "") {
      throw new Error("Conteúdo da review não pode ser vazio");
    }

    data.content = content.trim();
  }

  if (Object.keys(data).length === 0) {
    throw new Error("Informe ao menos um campo para atualizar");
  }

  return updateReview({
    id: reviewId,
    data,
  });
};

const deleteReviewService = async ({ reviewId, userId }) => {
  const review = await findReviewById(reviewId);

  if (!review) {
    throw new Error("Review não encontrada");
  }

  if (review.userId !== userId) {
    throw new Error("Você não pode deletar essa review");
  }

  await deleteReview(reviewId);

  return {
    message: "Review deletada com sucesso",
  };
};

export {
  createReviewService,
  getMyReviewsService,
  getUserReviewsService,
  updateReviewService,
  deleteReviewService,
};