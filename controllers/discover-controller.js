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
  const response = await axios(`https://api.nytimes.com/svc/books/v3/lists/overview.json?api-key=${process.env.NYT_API_KEY}`)
  const { lists } = response.data.results
  const bestSellersOverview = lists.map(list => {
    return {
      label: list.display_name,
      value: list.list_name,
      books: list.books
    }
  })
  res.status(StatusCodes.OK).json({
    message: "NYT Best Sellers Overview retrieved successfully",
    lists: bestSellersOverview
  });
}

const getBestSellersbyGenre = async (req, res) => {
  const { genre } = req.params
  const response = await axios(`https://api.nytimes.com/svc/books/v3/lists.json?list=${genre}?api-key=${process.env.NYT_API_KEY}`)
  const { results } = response.data
  res.status(StatusCodes.OK).json({
    message: `NYT ${genre} best sellers retrieved successfully`,
    bestSellers: results
  });
}

const searchBooks = async (req,res) => {
  const { query } = req.query
  console.log(query)
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

export { getBestSellersOverview, getBestSellersbyGenre, getBestSellersGenres, searchBooks }