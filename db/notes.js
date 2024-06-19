const { prisma } = require("../db/prisma");

const getNotes = async (listId) => {
  const notes = await prisma.note.findMany({
    where: {
      listId,
    },
  });
  return notes;
};

const createNote = async (text, listId) => {
  const note = await prisma.note.create({
    data: {
      text,
      list: {
        connect: {
          id: listId,
        },
      },
    },
  });
  return note;
};

const updateNote = async (id, text, checked, listId) => {
  const note = await prisma.note.update({
    where: {
      id,
      list: {
        id: listId,
      },
    },
    data: {
      text,
      checked,
    },
  });
  return note;
};

const deleteNote = async (id, listId) => {
  await prisma.note.delete({
    where: {
      id,
    },
  });
};

module.exports = { getNotes, createNote, updateNote, deleteNote };
