import prisma from "../../config/database.js";

const findBookByGoogleBooksId = async (googleBooksId) => {
  return prisma.media.findFirst({
    where: {
      type: "BOOK",
      bookDetails: {
        googleBooksId,
      },
    },
    include: {
      bookDetails: true,
    },
  });
};

const createBook = async (data) => {
  return prisma.media.create({
    data: {
      type: "BOOK",
      title: data.title,
      description: data.description,
      posterPath: data.cover,
      releaseDate: data.publishedDate ? new Date(data.publishedDate) : null,

      bookDetails: {
        create: {
          googleBooksId: data.googleBooksId,
          authors: data.authors || [],
          publisher: data.publisher,
          pageCount: data.pageCount,
          isbn: data.isbn,
        },
      },
    },
    include: {
      bookDetails: true,
    },
  });
};

export { findBookByGoogleBooksId, createBook };