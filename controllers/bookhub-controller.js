import axios from 'axios'
import { StatusCodes } from 'http-status-codes'

const searchBooks = async (req, res) => {
  try {
    const response = await axios({
      url: `https://book-info-hub.p.rapidapi.com/search.php?query=${req.query.data}`,
      headers: {
        "X-RapidAPI-Key": "0435c9e626msh69ef4c61d151b29p143368jsn3b1769d8ff96",
        "X-RapidAPI-Host": "book-info-hub.p.rapidapi.com"
      }
    })
    res.status(StatusCodes.OK).json(response.data);
  } catch (error) {
    console.log(error.response)
  }
}

const getBookDetails = async (req, res) => {
  try {
    const response = await axios({
      url: `https://book-info-hub.p.rapidapi.com/detail.php?book=${req.params.id}`,
      headers: {
        "X-RapidAPI-Key": "0435c9e626msh69ef4c61d151b29p143368jsn3b1769d8ff96",
        "X-RapidAPI-Host": "book-info-hub.p.rapidapi.com"
      }
    })
    const { data } = response
    const results = {
      ...data,
      pages: data.page_format.replace(/[^0-9]/g, ""),
      year: data.publication_info.substring(data.publication_info.length - 4)
    }
    res.status(StatusCodes.OK).json(results);
  } catch (error) {
    console.log(error.response)
  }
}

const getRecommendedBooks = async (req, res) => {
  try {
    const response = await axios({
      url: `https://book-info-hub.p.rapidapi.com/similar.php?book=${req.query.data}`,
      headers: {
        "X-RapidAPI-Key": "0435c9e626msh69ef4c61d151b29p143368jsn3b1769d8ff96",
        "X-RapidAPI-Host": "book-info-hub.p.rapidapi.com"
      }
    })
    res.status(StatusCodes.OK).json(response.data);
  } catch (error) {
    console.log(error.response)
  }
}

export { searchBooks, getBookDetails, getRecommendedBooks }