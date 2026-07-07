import {
  followUserService,
  getFollowersService,
  getFollowingService,
  unfollowUserService,
} from "./follow.service.js";

const followUserController = async (req, res) => {
  try {
    const followerId = req.user.id;
    const { userId } = req.params;

    const follow = await followUserService(followerId, userId);

    res.status(201).json(follow);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const unfollowUserController = async (req, res) => {
  try {
    const followerId = req.user.id;
    const { userId } = req.params;

    await unfollowUserService(followerId, userId);

    res.json({ message: "Usuário deixou de ser seguido" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getFollowersController = async (req, res) => {
  try {
    const { userId } = req.params;

    const followers = await getFollowersService(userId);

    res.json(followers);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getFollowingController = async (req, res) => {
  try {
    const { userId } = req.params;

    const following = await getFollowingService(userId);

    res.json(following);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export {
  followUserController,
  unfollowUserController,
  getFollowersController,
  getFollowingController,
};