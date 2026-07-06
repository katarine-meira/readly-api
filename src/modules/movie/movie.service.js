import axios from "axios";
import prisma from "../../config/database.js";
import { findMovieByTmdbId, createMovie } from "./movie.repository.js";
import { getMovieByTmdbId } from "../../services/tmdb.service.js";
import { findReviewByMediaId } from "../review/review.repository.js";

const API_KEY = process.env.TMDB_API_KEY;
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const ensureMovieExists = async (tmdbId) => {
  let movie = await findMovieByTmdbId(tmdbId);

  if (movie) return movie;

  const tmdbMovie = await getMovieByTmdbId(tmdbId);

  movie = await createMovie({
    tmdbId: tmdbMovie.id,
    title: tmdbMovie.title,
    description: tmdbMovie.overview,
    posterPath: tmdbMovie.poster_path,
    releaseDate: tmdbMovie.release_date
      ? new Date(tmdbMovie.release_date)
      : null,
  });

  return movie;
};

const getMovieDetailsService = async (tmdbId) => {
  const movie = await ensureMovieExists(tmdbId);

  const reviews = await findReviewByMediaId(movie.id);

  const aggregation = await prisma.review.aggregate({
    where: {
      mediaId: movie.id,
    },
    _avg: {
      rating: true,
    },
    _count: true,
  });

  const tmdbMovie = await getMovieByTmdbId(tmdbId);

  const formattedMovie = {
    id: movie.id,
    tmdbId: tmdbMovie.id,
    type: movie.type,

    title: tmdbMovie.title,
    overview: tmdbMovie.overview,

    poster_url: tmdbMovie.poster_path
      ? `${IMAGE_BASE_URL}${tmdbMovie.poster_path}`
      : null,

    backdrop_url: tmdbMovie.backdrop_path
      ? `${IMAGE_BASE_URL}${tmdbMovie.backdrop_path}`
      : null,

    release_date: tmdbMovie.release_date,
    runtime: tmdbMovie.runtime,
    genres: tmdbMovie.genres,
  };

  return {
    movie: formattedMovie,
    reviews,
    averageRating: aggregation._avg.rating || 0,
    totalReviews: aggregation._count,
  };
};

const searchMoviesService = async ({ search, page = 1, genre, sort }) => {
  let url = "https://api.themoviedb.org/3/discover/movie";

  if (search) {
    url = "https://api.themoviedb.org/3/search/movie";
  }

  const response = await axios.get(url, {
    params: {
      api_key: API_KEY,
      query: search,
      page,
      with_genres: genre,
      sort_by: sort === "popular" ? "popularity.desc" : "vote_average.desc",
      language: "pt-BR",
    },
  });

  return response.data;
};

export { ensureMovieExists, getMovieDetailsService, searchMoviesService };