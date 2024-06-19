const { prisma } = require("../db/prisma");

const getLists = async () => {
  const lists = await prisma.list.findMany();
  return lists;
};

const createList = async (title) => {
  const list = await prisma.list.create({
    data: { title },
  });
  return list;
};

const updateList = async (id, title) => {
  const list = await prisma.list.update({
    where: {
      id,
    },
    data: {
      title,
    },
  });
  return list;
};

const deleteList = async (id) => {
  await prisma.list.delete({
    where: {
      id,
    },
  });
};

module.exports = { getLists, createList, updateList, deleteList };
