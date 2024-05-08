import mongoose from "mongoose";

const BookSchema = new mongoose.Schema({
	userId: {
		type: String
	},
	bookId: {
		type: String
	},
	isbn: {
		type: String
	},
	title: {
		type: String
	},
	author: {
		type: String
	},
	image: {
		type: String
	},
	status: {
		type: String,
		enum: ["Completed", "Unread", "Reading"],
		default: "Unread"
	},
	myRating: {
		type: Number,
		min: 0,
		max: 5
	},
	favorite: {
		type: Boolean
	},
	createdAt: {
		type: Date,
		default: () => Date.now(),
		immutable: true
	},
	updatedAt: {
		type: Date,
		default: () => Date.now()
	}
}, { timestamps: true });

export default mongoose.model("Book", BookSchema);