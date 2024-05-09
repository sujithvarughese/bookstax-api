import express from 'express'
const router = express.Router();
import {
  searchBooks,
  getBookDetails,
  getRecommendedBooks
} from "../controllers/bookhub-controller.js"

router.route("/recommended").get(getRecommendedBooks)
router.route("/search").get(searchBooks)
router.route("/:id").get(getBookDetails)


export default router