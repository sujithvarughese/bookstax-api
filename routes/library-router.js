import express from "express";

const router = express.Router();
import {
	getLibrary,
	addBookToLibrary,
	getBookDetails,
	updateBookDetails,
	removeBookFromLibrary
} from "../controllers/library-controller.js";

router.route("/")
      .get(getLibrary)
      .post(addBookToLibrary);


router.route("/:id")
      .get(getBookDetails)
      .patch(updateBookDetails)
      .delete(removeBookFromLibrary);


export default router;
