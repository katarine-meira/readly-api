import prisma from "../../config/database.js";

const findMovieByTmdbId = async (tmdbId) => {
  return prisma.media.findFirst({
    where: {
      type: "MOVIE",
      movieDetails: {
        tmdbId,
      },
    },
    include: {
      movieDetails: true,
    },
  });
};

const createMovie = async (data) => {
  return prisma.media.create({
    data: {
      type: "MOVIE",
      title: data.title,
      description: data.description,
      posterPath: data.posterPath,
      releaseDate: data.releaseDate,

      movieDetails: {
        create: {
          tmdbId: data.tmdbId,
        },
      },
    },
    include: {
      movieDetails: true,
    },
  });
};

export { findMovieByTmdbId, createMovie };