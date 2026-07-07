import {
  loginUser,
  registerUser,
  getMeService,
  getPublicUserProfileService,
  searchUsersService,
} from "./user.service.js";

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await registerUser(name, email, password);

    const { password: _, ...userWithoutPassword } = user;

    res.status(201).json(userWithoutPassword);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const { user, token } = await loginUser(email, password);

    const { password: _, ...userWithoutPassword } = user;

    res.json({
      user: userWithoutPassword,
      token,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const me = async (req, res) => {
  try {
    const user = await getMeService(req.user.id);

    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getPublicUserProfile = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await getPublicUserProfileService(id);

    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const searchUsers = async (req, res) => {
  try {
    const { search } = req.query;

    const users = await searchUsersService({
      search,
      currentUserId: req.user.id,
    });

    res.json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export { register, login, me, getPublicUserProfile, searchUsers };