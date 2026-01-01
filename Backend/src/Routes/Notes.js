import express from "express";
import {
  getAllNotes,
  getNoteById,
  addNote,
  deleteNote,
  updateNote,
} from "../Controllers/NotesController.js";

const NotesRouter = express.Router();

NotesRouter.get("/", getAllNotes);

NotesRouter.get("/:id", getNoteById);

NotesRouter.post("/", addNote);

NotesRouter.delete("/:id", deleteNote);

NotesRouter.put("/:id", updateNote);

export default NotesRouter;
