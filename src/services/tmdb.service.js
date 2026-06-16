
import axios from "axios";

const API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

const getMovieByTmdbId = async (tmdbId) => {
  const response = await axios.get(
    `${BASE_URL}/movie/${tmdbId}`,
    {
      params: {
        api_key: API_KEY,
        language: "pt-BR"
      }
    }
  );

  return response.data;
};

export { getMovieByTmdbId };