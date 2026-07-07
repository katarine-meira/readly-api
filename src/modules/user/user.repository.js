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
        orderBy: {
          createdAt: "desc",
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
        orderBy: {
          createdAt: "desc",
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
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });
};

const findPublicUserById = async (id) => {
  return prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      createdAt: true,

      _count: {
        select: {
          reviews: true,
          lists: true,
        },
      },

      reviews: {
        take: 10,
        orderBy: {
          createdAt: "desc",
        },
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
        take: 20,
        orderBy: {
          createdAt: "desc",
        },
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
        where: {
          visibility: "PUBLIC",
        },
        take: 10,
        orderBy: {
          createdAt: "desc",
        },
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

const countFollowersByUserId = async (userId) => {
  return prisma.follows.count({
    where: {
      followingId: userId,
    },
  });
};

const countFollowingByUserId = async (userId) => {
  return prisma.follows.count({
    where: {
      followerId: userId,
    },
  });
};

const searchUsersByName = async ({ search, excludeUserId }) => {
  return prisma.user.findMany({
    where: {
      id: {
        not: excludeUserId,
      },
      name: {
        contains: search,
        mode: "insensitive",
      },
    },
    select: {
      id: true,
      name: true,
      createdAt: true,
    },
    take: 20,
    orderBy: {
      name: "asc",
    },
  });
};

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

export {
  createUser,
  findUserByEmail,
  findUserById,
  findPublicUserById,
  countFollowersByUserId,
  countFollowingByUserId,
  searchUsersByName,
  findFollowingIdsByUserId,
};