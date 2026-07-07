import axios from "axios";
import prisma from "../../config/database.js";
import { createBook, findBookByGoogleBooksId } from "./book.repository.js";
import { findReviewByMediaId } from "../review/review.repository.js";

const GOOGLE_BOOKS_URL = "https://www.googleapis.com/books/v1/volumes";
const GOOGLE_BOOKS_API_KEY = process.env.GOOGLE_BOOKS_API_KEY;

const ensureBookExists = async (googleBooksId) => {
  let book = await findBookByGoogleBooksId(googleBooksId);

  if (book) return book;

  try {
    const response = await axios.get(`${GOOGLE_BOOKS_URL}/${googleBooksId}`, {
      params: {
        key: GOOGLE_BOOKS_API_KEY,
      },
    });

    const googleBook = response.data;
    const info = googleBook.volumeInfo;

    book = await createBook({
      googleBooksId: googleBook.id,
      title: info.title,
      description: info.description || null,
      cover: info.imageLinks?.thumbnail || null,
      publishedDate: info.publishedDate || null,
      authors: info.authors || [],
      publisher: info.publisher || null,
      pageCount: info.pageCount || null,
      isbn: info.industryIdentifiers?.[0]?.identifier || null,
    });

    return book;
  } catch (error) {
    if (error.response?.status === 429) {
      throw new Error(
        "Limite de requisições da Google Books API atingido. Tente novamente em alguns minutos."
      );
    }

    throw new Error("Erro ao buscar detalhes do livro na Google Books API");
  }
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

  try {
    const startIndex = (Number(page) - 1) * 10;

    const response = await axios.get(GOOGLE_BOOKS_URL, {
      params: {
        q: search,
        startIndex,
        maxResults: 10,
        langRestrict: "pt",
        key: GOOGLE_BOOKS_API_KEY,
      },
    });

    return response.data;
  } catch (error) {
  console.log("STATUS:", error.response?.status);
  console.log("DATA:", JSON.stringify(error.response?.data, null, 2));
  console.log("MESSAGE:", error.message);
  console.log("SEARCH:", search);
  console.log("API KEY:", GOOGLE_BOOKS_API_KEY);

  throw new Error(
    error.response?.data?.error?.message ||
    "Erro ao buscar livros na Google Books API"
  );
}
};

export { ensureBookExists, getBookDetailsService, searchBooksService };