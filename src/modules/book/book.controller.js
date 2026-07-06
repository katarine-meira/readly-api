import { getBookDetailsService, searchBooksService } from "./book.service.js";

const getBookDetailsController = async (req, res) => {
  try {
    const { googleBooksId } = req.params;

    const data = await getBookDetailsService(googleBooksId);

    res.json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getBooksController = async (req, res) => {
  try {
    const { search, page } = req.query;

    const data = await searchBooksService({ search, page });

    res.json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export { getBookDetailsController, getBooksController };