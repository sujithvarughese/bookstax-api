import axios from 'axios'
import { StatusCodes } from 'http-status-codes'

const getBestSellersGenres = async (req, res) => {
  const response = await axios(`https://api.nytimes.com/svc/books/v3/lists/names.json?api-key=${process.env.NYT_API_KEY}`)
  const { results } = response.data
  const genreList = results.map(result => {
    return {
      label: result.display_name,
      value: result.list_name
    }
  })
  res.status(StatusCodes.OK).json({
    message: "NYT genre list retrieved successfully",
    genreList: genreList
  });
}

const getBestSellersOverview = async (req, res) => {
  const response = await axios(`https://api.nytimes.com/svc/books/v3/lists/full-overview.json?api-key=${process.env.NYT_API_KEY}`)
  const { lists } = response.data.results
  const bestSellersOverview_ = lists.filter(list => {
    return (list.list_id === 704 || list.list_id === 708 || list.list_id === 24 || list.list_id === 10018)
  })
  const bestSellersOverview = bestSellersOverview_.map(list => {
    const books = list.books.map(book => {
      return {
        bookId: book.primary_isbn10 || book.primary_isbn13,
        title: book.title,
        author: book.author,
        image: book.book_image,
        buyLinks: book.buy_links

      }
    })
    return {
      label: list.display_name,
      value: list.list_name,
      books: books
    }
  })
  res.status(StatusCodes.OK).json({
    message: "NYT Best Sellers Overview retrieved successfully",
    lists: bestSellersOverview
  });
}

const getBestSellersByGenre = async (req, res) => {
  const { genre } = req.params
  const response = await axios(`https://api.nytimes.com/svc/books/v3/lists.json?list=${genre}?api-key=${process.env.NYT_API_KEY}`)
  const { results } = response.data
  res.status(StatusCodes.OK).json({
    message: `NYT ${genre} best sellers retrieved successfully`,
    bestSellers: results
  });
}

const getAllBestSellers = async (req, res) => {
  const response = await axios(`https://api.nytimes.com/svc/books/v3/lists/best-sellers/history.json?api-key=${process.env.NYT_API_KEY}`)
  const { results } = response.data
  res.status(StatusCodes.OK).json({
    message: `NYT best sellers retrieved successfully`,
    list: results
  });
}

const searchBooks_ = async (req,res) => {
  const { query } = req.query
  try {
    const response = await axios(`https://openlibrary.org/subjects/${query}.json?limit=36`)
    const { works } = response.data
    const books = works.map(work => {
      return {
        title: work.title,
        author: work.authors[0]?.name,
        coverID: work.cover_id,
        OLID: work.key.substring(7),
        coverEditionKey: work.cover_edition_key,
        yearPublished: work.first_publish_year,
      }
    })
    res.status(StatusCodes.OK).json({
      message: `Search results for "${query}" retrieved successfully`,
      lists: { searchResults: books }
    });
  } catch (error) {
    throw new Error(error)
  }
}

const searchBooks = async (req, res) => {
  try {
    const response = await axios({
      url: `https://book-info-hub.p.rapidapi.com/search.php?query=${req.query.data}`,
      headers: {
        "X-RapidAPI-Key": "0435c9e626msh69ef4c61d151b29p143368jsn3b1769d8ff96",
        "X-RapidAPI-Host": "book-info-hub.p.rapidapi.com"
      }
    })
    res.status(StatusCodes.OK).json({
      message: `Search results for "${req.query.data}" retrieved successfully`,
      books: response.data
    });
  } catch (error) {
    console.log(error.response)
  }
}


export { getBestSellersOverview, getBestSellersByGenre, getBestSellersGenres, searchBooks }