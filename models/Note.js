import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema({
    book: {
        type: mongoose.Types.ObjectId,
        ref: "Book"
    },
    title: {
        type: String,
        required: [true, "Please provide title"]
    },
    content: {
        type: String,
        required: [true, "Please provide Author(s)"]
    },
    flag: {
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

export default mongoose.model("Note", NoteSchema);