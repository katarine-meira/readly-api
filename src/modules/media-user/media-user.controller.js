import {
  addMediaUserStatusService,
  getMyMediaStatusesService,
  removeMediaUserStatusService,
} from "./media-user.service.js";

const addMediaUserStatusController = async (req, res) => {
  try {
    const { mediaId, status } = req.body;

    const result = await addMediaUserStatusService({
      userId: req.user.id,
      mediaId,
      status,
    });

    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const removeMediaUserStatusController = async (req, res) => {
  try {
    const { mediaId, status } = req.params;

    const result = await removeMediaUserStatusService({
      userId: req.user.id,
      mediaId,
      status,
    });

    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getMyMediaStatusesController = async (req, res) => {
  try {
    const { status, type } = req.query;

    const result = await getMyMediaStatusesService({
      userId: req.user.id,
      status,
      type,
    });

    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export {
  addMediaUserStatusController,
  removeMediaUserStatusController,
  getMyMediaStatusesController,
};