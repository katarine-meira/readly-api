import {
  addMediaToList,
  createList,
  deleteList,
  findListById,
  findListsByUserId,
  findPublicListsByUserId,
  removeMediaFromList,
  updateList,
} from "./list.repository.js";

import { findMediaById } from "../media/media.repository.js";

const createListService = async (userId, data) => {
  const { name, description, visibility = "PUBLIC" } = data;

  if (!name || name.trim() === "") {
    throw new Error("Nome da lista é obrigatório");
  }

  return createList({
    userId,
    name: name.trim(),
    description: description?.trim() || null,
    visibility,
  });
};

const getMyListsService = async (userId) => {
  return findListsByUserId(userId);
};

const getPublicUserListsService = async (userId) => {
  return findPublicListsByUserId(userId);
};

const updateListService = async ({ userId, listId, name, description, visibility }) => {
  const list = await findListById(listId);

  if (!list) {
    throw new Error("Lista não encontrada");
  }

  if (list.userId !== userId) {
    throw new Error("Você não pode editar essa lista");
  }

  const data = {};

  if (name !== undefined) {
    if (!name || name.trim() === "") {
      throw new Error("Nome da lista não pode ser vazio");
    }

    data.name = name.trim();
  }

  if (description !== undefined) {
    data.description = description?.trim() || null;
  }

  if (visibility !== undefined) {
    if (!["PUBLIC", "PRIVATE"].includes(visibility)) {
      throw new Error("Visibilidade inválida");
    }

    data.visibility = visibility;
  }

  if (Object.keys(data).length === 0) {
    throw new Error("Informe algum campo para atualizar");
  }

  return updateList({
    id: listId,
    data,
  });
};

const deleteListService = async ({ userId, listId }) => {
  const list = await findListById(listId);

  if (!list) {
    throw new Error("Lista não encontrada");
  }

  if (list.userId !== userId) {
    throw new Error("Você não pode deletar essa lista");
  }

  await deleteList(listId);

  return {
    message: "Lista deletada com sucesso",
  };
};

const addMediaToListService = async (userId, listId, mediaId) => {
  const list = await findListById(listId);

  if (!list) {
    throw new Error("Lista não encontrada");
  }

  if (list.userId !== userId) {
    throw new Error("Você não pode alterar essa lista");
  }

  const media = await findMediaById(mediaId);

  if (!media) {
    throw new Error("Mídia não encontrada");
  }

  return addMediaToList({
    listId,
    mediaId,
  });
};

const removeMediaFromListService = async (userId, listId, mediaId) => {
  const list = await findListById(listId);

  if (!list) {
    throw new Error("Lista não encontrada");
  }

  if (list.userId !== userId) {
    throw new Error("Você não pode alterar essa lista");
  }

  return removeMediaFromList({
    listId,
    mediaId,
  });
};

export {
  createListService,
  getMyListsService,
  getPublicUserListsService,
  updateListService,
  deleteListService,
  addMediaToListService,
  removeMediaFromListService,
};