import {
  createReviewService,
  deleteReviewService,
  getMyReviewsService,
  getUserReviewsService,
  updateReviewService,
} from "./review.service.js";

const createReviewController = async (req, res) => {
  try {
    const { tmdbId, mediaId, rating, content } = req.body;

    const review = await createReviewService({
      userId: req.user.id,
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

const getMyReviewsController = async (req, res) => {
  try {
    const reviews = await getMyReviewsService(req.user.id);

    res.json(reviews);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getUserReviewsController = async (req, res) => {
  try {
    const { userId } = req.params;

    const reviews = await getUserReviewsService(userId);

    res.json(reviews);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateReviewController = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating, content } = req.body;

    const review = await updateReviewService({
      reviewId: id,
      userId: req.user.id,
      rating,
      content,
    });

    res.json(review);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteReviewController = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await deleteReviewService({
      reviewId: id,
      userId: req.user.id,
    });

    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export {
  createReviewController,
  getMyReviewsController,
  getUserReviewsController,
  updateReviewController,
  deleteReviewController,
};