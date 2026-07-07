import prisma from "../../config/database.js";

const findFollowingIdsByUserId = async (userId) => {
  return prisma.follows.findMany({
    where: {
      followerId: userId,
    },
    select: {
      followingId: true,
    },
  });
};

const findRecentReviewsByUsers = async (userIds) => {
  return prisma.review.findMany({
    where: {
      userId: {
        in: userIds,
      },
    },
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
    orderBy: {
      createdAt: "desc",
    },
    take: 30,
  });
};

const findRecentMediaStatusesByUsers = async (userIds) => {
  return prisma.mediaUser.findMany({
    where: {
      userId: {
        in: userIds,
      },
    },
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
    orderBy: {
      createdAt: "desc",
    },
    take: 30,
  });
};

export {
  findFollowingIdsByUserId,
  findRecentReviewsByUsers,
  findRecentMediaStatusesByUsers,
};