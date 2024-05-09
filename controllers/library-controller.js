import { StatusCodes } from "http-status-codes";
import { BadRequestError } from "../errors/index.js";
import Book from "../models/Book.js";
import axios from 'axios'

// GET all library in library
const getLibrary = async (req, res) => {
	const library = await Book.find({ userId: req.params.id }).sort({ updatedAt: -1 })
	res.status(StatusCodes.OK).json(library)
}

const getCurrentlyReading = async (req, res) => {
	const data = await Book.find({ userId: req.params.id, status: "Reading" }).sort({ updatedAt: -1 })
	res.status(StatusCodes.OK).json(data);
}

// POST add single book from req.body object
const addBookToLibrary = async (req, res) => {
	const { title, author, image, bookId, userId } = req.body
	// check if book is already in library, if so send error is response
	const duplicate = await Book.findOne({ userId: req.body.userId, title: req.body.title })
	if (duplicate) {
		throw new BadRequestError("Book already in Library!");
	}
	// create new mongo document for new book
	const book = await Book.create({
		title,
		author,
		image,
		bookId,
		userId,
		favorite: false,
		status: "Unread",
		myRating: 0
	});
	res.status(StatusCodes.CREATED).json(book);
}

// PATCH book details from req.body
const updateBookDetails = async (req, res) => {
	const book = await Book.findOne({ userId: req.body.userId, _id: req.body._id })
	if (!book) {
		throw new BadRequestError("BookInfo not found");
	}
	// req.body will contain key value pair to replace old pair
	const updatedBook = await Book.findByIdAndUpdate(req.body._id, req.body);
	res.status(StatusCodes.OK).json({
		message: `${book.title} successfully updated`,
		data: updatedBook
	});
};

// DELETE book from library using params
const removeBookFromLibrary = async (req, res) => {
	const book = await Book.findOne({ bookId: req.params.id })
	if (!book) {
		throw new BadRequestError("BookInfo not found");
	}
	await Book.findByIdAndDelete(book._id);
	res.status(StatusCodes.OK).json({ message: `${book.title} successfully removed from library` });
};

const getBookshelves = async (req, res) => {

}


export { getLibrary, addBookToLibrary, updateBookDetails, removeBookFromLibrary, getCurrentlyReading }