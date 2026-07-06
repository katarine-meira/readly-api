import { getAllMediasService, getMediaByIdService } from "./media.service.js";

const getMediaByIdController = async (req, res) => {
  try {
    const { id } = req.params;

    const media = await getMediaByIdService(id);

    res.json(media);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllMediasController = async (req, res) => {
  try {
    const { type } = req.query;

    const medias = await getAllMediasService({ type });

    res.json(medias);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export { getMediaByIdController, getAllMediasController };