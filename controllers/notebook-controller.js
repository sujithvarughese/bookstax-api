import { StatusCodes } from "http-status-codes";
import { BadRequestError } from "../errors/index.js";
import Note from "../models/Note.js";

const getNotebook = async (req, res) => {
    const notebook = await Note.find({ book: req.params.id }).sort({ updatedAt: -1 })
    res.status(StatusCodes.OK).json({
        message: "notebook retrieved successfully",
        notebook: notebook
    });
}

const createNote = async (req, res) => {
    // const { book, title, content} = req.body
    const note = await Note.create(req.body)
    res.status(StatusCodes.OK).json({
        message: `success`,
        note: note
    });
}

const updateNote = async (req, res) => {
    // const { noteID, updatedNote: { title, content } } = req.body
    const { updatedNote } = req.body
    const note = await Note.findByIdAndUpdate(req.body.noteID, updatedNote)
    res.status(StatusCodes.OK).json({
        message: `success`,
        note: note
    });
}

export { getNotebook, createNote, updateNote}