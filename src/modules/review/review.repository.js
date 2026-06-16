import prisma from "../../config/database.js"

const createReview = async (data) => {
  return prisma.review.create({ data });
};

const findReviewByMovieId = (movieId) => {
  return prisma.review.findMany({
    where: {movieId},
    include: {
      user: {
        select: {
          id: true,
          name: true
        }
      }
    },
    orderBy: {
      createdAt: "desc"
    }
  })
}
export {
  createReview,
  findReviewByMovieId
};