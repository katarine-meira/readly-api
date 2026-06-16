import prisma from "../../config/database.js";

const findMovieByTmdbId = (tmdbId) => {
    return prisma.movie.findUnique({
        where: {tmdbId}
    });
};

const createMovie = (data) => {
    return prisma.movie.create({data})
};

export {
    findMovieByTmdbId,
    createMovie
}