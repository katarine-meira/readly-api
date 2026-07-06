import prisma from "../../config/database.js";

const createUser = async (data) => {
  return prisma.user.create({
    data,
  });
};

const findUserByEmail = async (email) => {
  return prisma.user.findUnique({
    where: {
      email,
    },
  });
};

const findUserById = async (id) => {
  return prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,

      reviews: {
        include: {
          media: {
            include: {
              movieDetails: true,
              bookDetails: true,
            },
          },
        },
      },

      mediaRelations: {
        include: {
          media: {
            include: {
              movieDetails: true,
              bookDetails: true,
            },
          },
        },
      },

      lists: {
        include: {
          items: {
            include: {
              media: {
                include: {
                  movieDetails: true,
                  bookDetails: true,
                },
              },
            },
          },
        },
      },
    },
  });
};

export { createUser, findUserByEmail, findUserById };