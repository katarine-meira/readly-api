import {
  createMediaUserStatus,
  deleteManyMediaUserStatuses,
  deleteMediaUserStatus,
  findMediaById,
  findMediaUserStatus,
  findUserMediaStatuses,
} from "./media-user.repository.js";

const MOVIE_STATUSES = ["WATCHED", "WATCHLIST", "FAVORITE"];
const BOOK_STATUSES = ["READ", "READING", "WANT_TO_READ", "FAVORITE"];

const MOVIE_EXCLUSIVE_STATUSES = ["WATCHED", "WATCHLIST"];
const BOOK_EXCLUSIVE_STATUSES = ["READ", "READING", "WANT_TO_READ"];

const validateStatusByMediaType = (mediaType, status) => {
  if (mediaType === "MOVIE" && !MOVIE_STATUSES.includes(status)) {
    throw new Error("Status inválido para filme");
  }

  if (mediaType === "BOOK" && !BOOK_STATUSES.includes(status)) {
    throw new Error("Status inválido para livro");
  }
};

const addMediaUserStatusService = async ({ userId, mediaId, status }) => {
  if (!mediaId || !status) {
    throw new Error("mediaId e status são obrigatórios");
  }

  const media = await findMediaById(mediaId);

  if (!media) {
    throw new Error("Mídia não encontrada");
  }

  validateStatusByMediaType(media.type, status);

  const alreadyExists = await findMediaUserStatus({
    userId,
    mediaId,
    status,
  });

  if (alreadyExists) {
    return alreadyExists;
  }

  if (media.type === "MOVIE" && MOVIE_EXCLUSIVE_STATUSES.includes(status)) {
    await deleteManyMediaUserStatuses({
      userId,
      mediaId,
      statuses: MOVIE_EXCLUSIVE_STATUSES,
    });
  }

  if (media.type === "BOOK" && BOOK_EXCLUSIVE_STATUSES.includes(status)) {
    await deleteManyMediaUserStatuses({
      userId,
      mediaId,
      statuses: BOOK_EXCLUSIVE_STATUSES,
    });
  }

  return createMediaUserStatus({
    userId,
    mediaId,
    status,
  });
};

const removeMediaUserStatusService = async ({ userId, mediaId, status }) => {
  const relation = await findMediaUserStatus({
    userId,
    mediaId,
    status,
  });

  if (!relation) {
    throw new Error("Esse status não existe para essa mídia");
  }

  await deleteMediaUserStatus({
    userId,
    mediaId,
    status,
  });

  return {
    message: "Status removido com sucesso",
  };
};

const getMyMediaStatusesService = async ({ userId, status, type }) => {
  return findUserMediaStatuses({
    userId,
    status,
    type,
  });
};

export {
  addMediaUserStatusService,
  removeMediaUserStatusService,
  getMyMediaStatusesService,
};