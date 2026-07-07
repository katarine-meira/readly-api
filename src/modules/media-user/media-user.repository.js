import prisma from "../../config/database.js";

const findMediaById = async (mediaId) => {
  return prisma.media.findUnique({
    where: {
      id: mediaId,
    },
    include: {
      movieDetails: true,
      bookDetails: true,
    },
  });
};

const findMediaUserStatus = async ({ userId, mediaId, status }) => {
  return prisma.mediaUser.findUnique({
    where: {
      userId_mediaId_status: {
        userId,
        mediaId,
        status,
      },
    },
  });
};

const createMediaUserStatus = async ({ userId, mediaId, status }) => {
  return prisma.mediaUser.create({
    data: {
      userId,
      mediaId,
      status,
    },
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

const deleteMediaUserStatus = async ({ userId, mediaId, status }) => {
  return prisma.mediaUser.delete({
    where: {
      userId_mediaId_status: {
        userId,
        mediaId,
        status,
      },
    },
  });
};

const deleteManyMediaUserStatuses = async ({ userId, mediaId, statuses }) => {
  return prisma.mediaUser.deleteMany({
    where: {
      userId,
      mediaId,
      status: {
        in: statuses,
      },
    },
  });
};

const findUserMediaStatuses = async ({ userId, status, type }) => {
  return prisma.mediaUser.findMany({
    where: {
      userId,
      ...(status && { status }),
      ...(type && {
        media: {
          type,
        },
      }),
    },
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

export {
  findMediaById,
  findMediaUserStatus,
  createMediaUserStatus,
  deleteMediaUserStatus,
  deleteManyMediaUserStatuses,
  findUserMediaStatuses,
};