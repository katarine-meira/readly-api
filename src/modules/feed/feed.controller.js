import { getFeedService } from "./feed.service.js";

const getFeedController = async (req, res) => {
  try {
    const feed = await getFeedService(req.user.id);

    res.json(feed);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export { getFeedController };