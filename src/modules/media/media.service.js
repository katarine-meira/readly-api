import { findAllMedias, findMediaById } from "./media.repository.js";

const getMediaByIdService = async (id) => {
  const media = await findMediaById(id);

  if (!media) {
    throw new Error("Mídia não encontrada");
  }

  return media;
};

const getAllMediasService = async ({ type }) => {
  return findAllMedias({ type });
};

export { getMediaByIdService, getAllMediasService };