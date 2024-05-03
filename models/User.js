import mongoose from "mongoose";
import { InternalServerError, UnauthenticatedError } from "../errors/index.js";

const UserSchema = new mongoose.Schema({
	lastName: {
		type: String,
		required: [true, "please provide name"],
		minLength: 2,
		maxLength: 40,
		trim: true
	},
	firstName: {
		type: String,
		required: [true, "please provide name"],
		minLength: 2,
		maxLength: 40,
		trim: true
	},

	isAdmin: {
		type: Boolean,
		default: false
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



export default mongoose.model("User", UserSchema);