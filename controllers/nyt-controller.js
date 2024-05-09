import axios from 'axios'
import { StatusCodes } from 'http-status-codes'

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
  res.status(StatusCodes.OK).json(bestSellersOverview);
}

const getBestSellersGenres = async (req, res) => {
  const response = await axios(`https://api.nytimes.com/svc/books/v3/lists/names.json?api-key=${process.env.NYT_API_KEY}`)
  const { results } = response.data
  const genreList = results.map(result => result.list_name)
  res.status(StatusCodes.OK).json(genreList);
}
const getBestSellersByGenre = async (req, res) => {
  const response = await axios(`https://api.nytimes.com/svc/books/v3/lists/current/${req.params.id}.json?api-key=${process.env.NYT_API_KEY}`)
  const { results } = response.data
  const books = results.books.map(book => {
    return {
      bookId: book.primary_isbn10 || book.primary_isbn13,
      title: book.title,
      author: book.author,
      image: book.book_image,
      buyLinks: book.buy_links
    }
  })
  res.status(StatusCodes.OK).json(books);
}

const getAllBestSellers = async (req, res) => {
  const response = await axios(`https://api.nytimes.com/svc/books/v3/lists/best-sellers/history.json?api-key=${process.env.NYT_API_KEY}`)
  const { results } = response.data
  res.status(StatusCodes.OK).json({
    message: `NYT best sellers retrieved successfully`,
    list: results
  });
}

export { getBestSellersOverview, getBestSellersByGenre, getBestSellersGenres }
