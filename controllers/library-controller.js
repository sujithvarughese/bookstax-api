import { StatusCodes } from "http-status-codes";
import { BadRequestError } from "../errors/index.js";
import User from "../models/User.js";
import Book from "../models/Book.js";
import axios from 'axios'

// GET all library in library
const getLibrary = async (req, res) => {
	const library = await Book.find({ userId: req.params.id }).sort({ updatedAt: -1 })
	res.status(StatusCodes.OK).json({
		message: "library retrieved successfully",
		data: library
	});
}

const getCurrentlyReading = async (req, res) => {
	const library = await Book.find({ userId: req.params.id, status: "Reading" }).sort({ updatedAt: -1 })
	res.status(StatusCodes.OK).json({
		message: "library retrieved successfully",
		data: library
	});
}
const getBookshelves = async (req, res) => {

}

// POST add single book from req.body object
const addBookToLibrary = async (req, res) => {
	const { title, author, image, id, userId } = req.body
	console.log(req.body)
	// check if book is already in library, if so send error is response
	const duplicate = await Book.findOne({ userId: req.body.userId, title: req.body.title })
	if (duplicate) {
		throw new BadRequestError("Book already in Library!");
	}

	// create new mongo document for new book
	await Book.create({ title, author, image, bookId: id, userId });

	res.status(StatusCodes.CREATED).json({
		msg: `${req.body.title} added to library`,
	});
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
		res.status(StatusCodes.OK).json({
			message: "BookInfo retrieved successfully",
			data: {
				...data,
				pages: data.page_format.replace(/[^0-9]/g, ""),
				year: data.publication_info.substring(data.publication_info.length - 4)
			}
		});
	} catch (error) {
		console.log(error.response)
	}

}

// PATCH book details from req.body
const updateBookDetails = async (req, res) => {
	console.log("hello")
	console.log(req.body)
	const book = await Book.findOne({ userId: req.body.userId, _id: req.body._id })
	if (!book) {
		throw new BadRequestError("BookInfo not found");
	}
	// req.body will contain key value pair to replace old pair
	const updatedBook = await Book.findByIdAndUpdate(req.body._id, req.body);
	console.log(updatedBook)
	res.status(StatusCodes.OK).json({
		message: `${book.title} successfully updated`,
		data: updatedBook
	});
};

// DELETE book from library using params
const removeBookFromLibrary = async (req, res) => {
	const book = await Book.findOne({ user: req.user.userID, _id: req.params.id })
	if (!book) {
		throw new BadRequestError("BookInfo not found");
	}
	await Book.findByIdAndDelete(req.params.id);
	res.status(StatusCodes.OK).json({ message: `${book.title} successfully removed from library` });
};

const getRecentBooks = async (req, res) => {

}

const getRecommendedBooks = async (req, res) => {

}


export { getLibrary, addBookToLibrary, getBookDetails, updateBookDetails, removeBookFromLibrary, getCurrentlyReading }