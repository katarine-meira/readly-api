import bcrypt from "bcrypt";
import { generateToken } from "../../utils/jwt.js";
import {
  createUser,
  findUserByEmail,
  findUserById,
  findPublicUserById,
  countFollowersByUserId,
  countFollowingByUserId,
  searchUsersByName,
  findFollowingIdsByUserId,
} from "./user.repository.js";

const registerUser = async (name, email, password) => {
  const userExists = await findUserByEmail(email);

  if (userExists) {
    throw new Error("Email já está em uso");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  return createUser({
    name,
    email,
    password: hashedPassword,
  });
};

const loginUser = async (email, password) => {
  const user = await findUserByEmail(email);

  if (!user) {
    throw new Error("Usuário não encontrado");
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    throw new Error("Senha inválida");
  }

  const token = generateToken(user);

  return { user, token };
};

const getMeService = async (userId) => {
  const user = await findUserById(userId);

  if (!user) {
    throw new Error("Usuário não encontrado");
  }

  return user;
};

const getPublicUserProfileService = async (userId) => {
  const [user, followersCount, followingCount] = await Promise.all([
    findPublicUserById(userId),
    countFollowersByUserId(userId),
    countFollowingByUserId(userId),
  ]);

  if (!user) {
    throw new Error("Usuário não encontrado");
  }

  const { _count, ...userData } = user;

  return {
    ...userData,
    stats: {
      followers: followersCount,
      following: followingCount,
      reviews: _count.reviews,
      lists: _count.lists,
    },
  };
};

const searchUsersService = async ({ search, currentUserId }) => {
  if (!search || search.trim().length < 2) {
    throw new Error("Informe pelo menos 2 caracteres para buscar usuários");
  }

  const users = await searchUsersByName({
    search: search.trim(),
    excludeUserId: currentUserId,
  });

  const following = await findFollowingIdsByUserId(currentUserId);

  const followingIds = following.map((item) => item.followingId);

  return users.map((user) => ({
    ...user,
    isFollowing: followingIds.includes(user.id),
  }));
};

export {
  registerUser,
  loginUser,
  getMeService,
  getPublicUserProfileService,
  searchUsersService,
};