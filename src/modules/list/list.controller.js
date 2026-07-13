import {
  addMediaToListService,
  createListService,
  deleteListService,
  getMyListsService,
  getPublicUserListsService,
  removeMediaFromListService,
  updateListService,
} from "./list.service.js";

const createListController = async (req, res) => {
  try {
    const list = await createListService(req.user.id, req.body);

    res.status(201).json(list);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getMyListsController = async (req, res) => {
  try {
    const lists = await getMyListsService(req.user.id);

    res.json(lists);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getPublicUserListsController = async (req, res) => {
  try {
    const { userId } = req.params;

    const lists = await getPublicUserListsService(userId);

    res.json(lists);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateListController = async (req, res) => {
  try {
    const { listId } = req.params;
    const { name, visibility } = req.body;

    const list = await updateListService({
      userId: req.user.id,
      listId,
      name,
      description,
      visibility,
    });

    res.json(list);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteListController = async (req, res) => {
  try {
    const { listId } = req.params;

    const result = await deleteListService({
      userId: req.user.id,
      listId,
    });

    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const addMediaToListController = async (req, res) => {
  try {
    const { listId } = req.params;
    const { mediaId } = req.body;

    const item = await addMediaToListService(req.user.id, listId, mediaId);

    res.status(201).json(item);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const removeMediaFromListController = async (req, res) => {
  try {
    const { listId, mediaId } = req.params;

    await removeMediaFromListService(req.user.id, listId, mediaId);

    res.json({ message: "Mídia removida da lista" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export {
  createListController,
  getMyListsController,
  getPublicUserListsController,
  updateListController,
  deleteListController,
  addMediaToListController,
  removeMediaFromListController,
};