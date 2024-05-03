import express from "express";
const router = express.Router()

import { getNotebook, createNote, updateNote } from "../controllers/notebook-controller.js";

router.route("/:id").get(getNotebook)
router.route("/").post(createNote).patch(updateNote)

export default router
