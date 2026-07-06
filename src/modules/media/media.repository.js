import prisma from "../../config/database.js";

const findMediaById = async (id) => {
  return prisma.media.findUnique({
    where: { id },
    include: {
      movieDetails: true,
      bookDetails: true,
    },
  });
};

const findAllMedias = async ({ type }) => {
  return prisma.media.findMany({
    where: {
      ...(type && { type }),
    },
    include: {
      movieDetails: true,
      bookDetails: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export { findMediaById, findAllMedias };