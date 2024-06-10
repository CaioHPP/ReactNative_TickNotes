const express = require("express");
const router = express.Router();
const { getLists, createList, updateList, deleteList } = require("../db/lists");
const { z, ZodError } = require("zod");

const listSchema = z.object({
  title: z.string({
    message: "Título Inválido",
    required_error: "Título Obrigatório",
  }),
});

const listUpdSchema = z.object({
  title: z.string({
    message: "Título Inválido",
    required_error: "Título Obrigatório",
  }),
  notes: z.array({
    message: "Notas inválidas",
    required_error: "Notas obrigatórias (mesmo que vazias)",
  }),
});

router.get("/listas", async (req, res) => {
  const listas = await getLists();
  res.json(listas).status(200);
});

router.post("/lista", async (req, res) => {
  try {
    const data = listSchema.parse(req.body);
    const list = await createList(data.title);
    res.json(list).status(201);
  } catch (e) {
    if (e instanceof ZodError) {
      return res.status(400).json({ message: e.errors });
    }
    console.log(e);
    return res.status(500).json({ message: "Erro ao criar Lista de Notas" });
  }
});

router.put("/lista/:id", async (req, res) => {
  try {
    const data = listUpdSchema.parse(req.body);
    const list = await updateList(
      Number(req.params.id),
      data.title,
      data.notes
    );
    res.json(list).status(200);
  } catch (e) {
    if (e instanceof ZodError) {
      return res.status(400).json({ message: e.errors });
    }
    console.log(e);
    return res.status(404).json({ message: "Lista não encontrada" });
  }
});

router.delete("/lista/:id", async (req, res) => {
  try {
    await deleteList(Number(req.params.id));
    res.json({ message: "Lista deletada" }).status(204);
  } catch (e) {
    console.log(e);
    return res.status(404).json({ message: "Lista não encontrada" });
  }
});

module.exports = { router };
