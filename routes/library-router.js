import express from "express";

const router = express.Router();
import {
	getLibrary,
	addBookToLibrary,
	updateBookDetails,
	removeBookFromLibrary,
	getCurrentlyReading
} from "../controllers/library-controller.js";

router.route("/").post(addBookToLibrary);

router.route("/current/:id").get(getCurrentlyReading)
router.route("/:id")
      .get(getLibrary)
      .patch(updateBookDetails)
      .delete(removeBookFromLibrary);


export default router;
