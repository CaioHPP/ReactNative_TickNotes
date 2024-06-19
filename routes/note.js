const express = require("express");
const router = express.Router();
const { getNotes, createNote, updateNote, deleteNote } = require("../db/notes");
const { z, ZodError } = require("zod");

const noteSchema = z.object({
  text: z.string({
    message: "Texto Inválido",
    required_error: "Texto Obrigatório",
  }),
  listId: z.number({
    message: "ID de Nota Inválido",
    required_error: "ID de Nota Obrigatório",
  }),
  checked: z
    .boolean({
      message: "Checked Value  inválido",
      required_error: "Checked Value Obrigatório",
    })
    .optional(),
});

router.get("/notas/:id", async (req, res) => {
  const notes = await getNotes(Number(req.params.id));
  res.json(notes).status(200);
});

router.post("/nota", async (req, res) => {
  try {
    const data = noteSchema.parse(req.body);
    const note = await createNote(data.text, data.listId);
    res.json(note).status(201);
  } catch (e) {
    if (e instanceof ZodError) {
      return res.status(400).json({ message: e.errors });
    }
    console.log(e);
    return res.status(500).json({ message: "Erro ao criar Nota" });
  }
});

router.put("/nota/:id", async (req, res) => {
  try {
    const data = noteSchema.parse(req.body);
    const note = await updateNote(
      Number(req.params.id),
      data.text,
      data.checked,
      data.listId
    );
    res.json(note).status(200);
  } catch (e) {
    if (e instanceof ZodError) {
      return res.status(400).json({ message: e.errors });
    }
    console.log(e);
    return res.status(404).json({ message: "Nota não encontrada" });
  }
});

router.delete("/nota/:id", async (req, res) => {
  try {
    await deleteNote(Number(req.params.id));
    res.json({ message: "Nota deletada" }).status(204);
  } catch (e) {
    console.log(e);
    return res.status(404).json({ message: "Nota não encontrada" });
  }
});

module.exports = { router };
