import prisma from "../../config/database.js";

const createReview = async (data) => {
  return prisma.review.create({
    data,
    include: {
      user: {
        select: {
          id: true,
          name: true,
        },
      },
      media: {
        include: {
          movieDetails: true,
          bookDetails: true,
        },
      },
    },
  });
};

const findReviewById = async (id) => {
  return prisma.review.findUnique({
    where: { id },
    include: {
      media: {
        include: {
          movieDetails: true,
          bookDetails: true,
        },
      },
    },
  });
};

const findUserReviewByMediaId = async ({ userId, mediaId }) => {
  return prisma.review.findFirst({
    where: {
      userId,
      mediaId,
    },
  });
};

const findReviewByMediaId = async (mediaId) => {
  return prisma.review.findMany({
    where: { mediaId },
    include: {
      user: {
        select: {
          id: true,
          name: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

const findReviewsByUserId = async (userId) => {
  return prisma.review.findMany({
    where: { userId },
    include: {
      media: {
        include: {
          movieDetails: true,
          bookDetails: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

const updateReview = async ({ id, data }) => {
  return prisma.review.update({
    where: { id },
    data,
    include: {
      media: {
        include: {
          movieDetails: true,
          bookDetails: true,
        },
      },
    },
  });
};

const deleteReview = async (id) => {
  return prisma.review.delete({
    where: { id },
  });
};

export {
  createReview,
  findReviewById,
  findUserReviewByMediaId,
  findReviewByMediaId,
  findReviewsByUserId,
  updateReview,
  deleteReview,
};