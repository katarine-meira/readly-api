import axios from "axios";
import prisma from "../../config/database.js";
import { createBook, findBookByGoogleBooksId } from "./book.repository.js";
import { findReviewByMediaId } from "../review/review.repository.js";

const GOOGLE_BOOKS_URL = "https://www.googleapis.com/books/v1/volumes";

const ensureBookExists = async (googleBooksId) => {
  let book = await findBookByGoogleBooksId(googleBooksId);

  if (book) return book;

  const response = await axios.get(`${GOOGLE_BOOKS_URL}/${googleBooksId}`);

  const googleBook = response.data;
  const info = googleBook.volumeInfo;

  book = await createBook({
    googleBooksId: googleBook.id,
    title: info.title,
    description: info.description,
    cover: info.imageLinks?.thumbnail || null,
    publishedDate: info.publishedDate || null,
    authors: info.authors || [],
    publisher: info.publisher || null,
    pageCount: info.pageCount || null,
    isbn: info.industryIdentifiers?.[0]?.identifier || null,
  });

  return book;
};

const getBookDetailsService = async (googleBooksId) => {
  const book = await ensureBookExists(googleBooksId);

  const reviews = await findReviewByMediaId(book.id);

  const aggregation = await prisma.review.aggregate({
    where: {
      mediaId: book.id,
    },
    _avg: {
      rating: true,
    },
    _count: true,
  });

  return {
    book,
    reviews,
    averageRating: aggregation._avg.rating || 0,
    totalReviews: aggregation._count,
  };
};

const searchBooksService = async ({ search, page = 1 }) => {
  if (!search) {
    throw new Error("Informe um termo de busca");
  }

  const startIndex = (Number(page) - 1) * 10;

  const response = await axios.get(GOOGLE_BOOKS_URL, {
    params: {
      q: search,
      startIndex,
      maxResults: 10,
      langRestrict: "pt",
    },
  });

  return response.data;
};

export { ensureBookExists, getBookDetailsService, searchBooksService };