import express from 'express'
const router = express.Router();
import { authenticateUser, authenticateAsGuest, connectDB } from "../controllers/auth-controller.js";

router.route("/guest").post(authenticateAsGuest)
router.route("/connect").get(connectDB)
router.route("/").post(authenticateUser)



export default router

