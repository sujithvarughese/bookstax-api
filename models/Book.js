import mongoose from "mongoose";

const BookSchema = new mongoose.Schema({
	user: {
		type: mongoose.Types.ObjectId,
		ref: "User"
	},
	description: {
		type: String
	},
	yearPublished: {
		type: String
	},
	infoURL: {
		type: String
	},
	previewAvailable: {
		type: String
	},
	previewURL: {
		type: String
	},
	status: {
		type: String,
		enum: ["read", "unread", "reading"],
		default: "unread"
	},
	rating: {
		type: Number,
		min: 0,
		max: 5
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