import express from 'express'
const router = express.Router();
import { getBestSellersOverview, searchBooks } from "../controllers/discover-controller.js";

router.route("/bestsellers").get(getBestSellersOverview)
router.route("/search").get(searchBooks)


export default router

