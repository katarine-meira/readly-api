import prisma from "../../config/database.js";

const followUser = async ({ followerId, followingId }) => {
  return prisma.follows.create({
    data: {
      followerId,
      followingId,
    },
  });
};

const unfollowUser = async ({ followerId, followingId }) => {
  return prisma.follows.delete({
    where: {
      followerId_followingId: {
        followerId,
        followingId,
      },
    },
  });
};

const findFollow = async ({ followerId, followingId }) => {
  return prisma.follows.findUnique({
    where: {
      followerId_followingId: {
        followerId,
        followingId,
      },
    },
  });
};

const getFollowers = async (userId) => {
  return prisma.follows.findMany({
    where: {
      followingId: userId,
    },
    include: {
      follower: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });
};

const getFollowing = async (userId) => {
  return prisma.follows.findMany({
    where: {
      followerId: userId,
    },
    include: {
      following: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });
};

export { followUser, unfollowUser, findFollow, getFollowers, getFollowing };