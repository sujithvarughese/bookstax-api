import express from 'express'
const router = express.Router();
import {
  getBestSellersOverview,
  getBestSellersByGenre,
  getBestSellersGenres
} from "../controllers/nyt-controller.js"

router.route("/bestsellers").get(getBestSellersOverview)
router.route("/genres/:id").get(getBestSellersByGenre)
router.route("/genres").get(getBestSellersGenres)

export default router