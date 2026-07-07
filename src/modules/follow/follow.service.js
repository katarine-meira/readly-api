import {
  findFollow,
  followUser,
  getFollowers,
  getFollowing,
  unfollowUser,
} from "./follow.repository.js";

const followUserService = async (followerId, followingId) => {
  if (followerId === followingId) {
    throw new Error("Você não pode seguir você mesmo");
  }

  const alreadyFollowing = await findFollow({
    followerId,
    followingId,
  });

  if (alreadyFollowing) {
    throw new Error("Você já segue esse usuário");
  }

  return followUser({
    followerId,
    followingId,
  });
};

const unfollowUserService = async (followerId, followingId) => {
  const follow = await findFollow({
    followerId,
    followingId,
  });

  if (!follow) {
    throw new Error("Você não segue esse usuário");
  }

  return unfollowUser({
    followerId,
    followingId,
  });
};

const getFollowersService = async (userId) => {
  return getFollowers(userId);
};

const getFollowingService = async (userId) => {
  return getFollowing(userId);
};

export {
  followUserService,
  unfollowUserService,
  getFollowersService,
  getFollowingService,
};