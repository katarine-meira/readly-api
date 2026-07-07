import prisma from "../../config/database.js";

const mediaInclude = {
  movieDetails: true,
  bookDetails: true,
};

const createList = async (data) => {
  return prisma.list.create({
    data,
  });
};

const findListsByUserId = async (userId) => {
  return prisma.list.findMany({
    where: { userId },
    include: {
      items: {
        include: {
          media: {
            include: mediaInclude,
          },
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

const findPublicListsByUserId = async (userId) => {
  return prisma.list.findMany({
    where: {
      userId,
      visibility: "PUBLIC",
    },
    include: {
      items: {
        include: {
          media: {
            include: mediaInclude,
          },
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

const findListById = async (id) => {
  return prisma.list.findUnique({
    where: { id },
  });
};

const updateList = async ({ id, data }) => {
  return prisma.list.update({
    where: { id },
    data,
  });
};

const deleteList = async (id) => {
  return prisma.list.delete({
    where: { id },
  });
};

const addMediaToList = async ({ listId, mediaId }) => {
  return prisma.listItem.create({
    data: {
      listId,
      mediaId,
    },
    include: {
      media: {
        include: mediaInclude,
      },
    },
  });
};

const removeMediaFromList = async ({ listId, mediaId }) => {
  return prisma.listItem.delete({
    where: {
      listId_mediaId: {
        listId,
        mediaId,
      },
    },
  });
};

export {
  createList,
  findListsByUserId,
  findPublicListsByUserId,
  findListById,
  updateList,
  deleteList,
  addMediaToList,
  removeMediaFromList,
};