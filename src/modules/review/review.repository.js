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
      media: true,
    },
  });
};

const findReviewByMediaId = async (mediaId) => {
  return prisma.review.findMany({
    where: {
      mediaId,
    },
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

export { createReview, findReviewByMediaId };