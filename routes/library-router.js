import express from "express";

const router = express.Router();
import {
	getLibrary,
	addBookToLibrary,
	getBookDetails,
	updateBookDetails,
	removeBookFromLibrary,
	getCurrentlyReading
} from "../controllers/library-controller.js";

router.route("/")
      .post(addBookToLibrary);

router.route("/user/currently/:id").get(getCurrentlyReading)
router.route("/user/:id").get(getLibrary)
router.route("/:id")
      .get(getBookDetails)
      .patch(updateBookDetails)
      .delete(removeBookFromLibrary);


export default router;
