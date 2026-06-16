import { getMovieDetailsService, searchMoviesService } from "./movie.service.js";

const getMovieDetailsController = async (req, res) => {
    try {
        const { tmdbId } = req.params;

        const data = await getMovieDetailsService(Number(tmdbId));
        
        res.json(data);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getMoviesController = async (req, res) => {
  try {
    const { search, page, genre, sort } = req.query;

    const data = await searchMoviesService({
      search,
      page,
      genre,
      sort
    });

    res.json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export { getMovieDetailsController, getMoviesController}