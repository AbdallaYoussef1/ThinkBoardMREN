import Note from "../Models/Note.js";

export async function getAllNotes(_, res) {
  try {
    const notes = await Note.find().sort({ createdAt: -1 }); // sort notes by createdAt in descending order
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function getNoteById(req, res) {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json({ note });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function addNote(req, res) {
  try {
    const { title, content } = req.body;
    const NewNote = new Note({ title, content });
    const savedNote = await NewNote.save();
    res.status(201).json({ savedNote });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function deleteNote(req, res) {
  try {
    const { id } = req.params;
    const note = await Note.findByIdAndDelete(id);
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json({ note });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function updateNote(req, res) {
  try {
    const note = await Note.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!note) {
      return res.status(404).json({ message: "Note not foundd" });
    }
    res.status(200).json({ note });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
