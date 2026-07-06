import { createReviewService } from "./review.service.js";

const createReviewController = async (req, res) => {
  try {
    const { tmdbId, mediaId, rating, content } = req.body;

    const userId = req.user.id;

    const review = await createReviewService({
      userId,
      tmdbId,
      mediaId,
      rating,
      content,
    });

    res.status(201).json(review);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export { createReviewController };