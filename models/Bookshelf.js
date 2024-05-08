import mongoose from "mongoose";

const BookshelfSchema = new mongoose.Schema({
  userId: {
    type: String
  },
  name: {
    type: String
  },
  description: {
    type: String
  },
  coverImage: {
    type: String
  },
  books: {
    type: [mongoose.Types.ObjectId],
    ref: "Book"
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

export default mongoose.model("Bookshelf", BookshelfSchema);