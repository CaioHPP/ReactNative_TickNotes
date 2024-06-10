const express = require("express");
const colors = require("colors");
const server = express();
const port = 3000;
const { router: listRouter } = require("./routes/list");
const { router: noteRouter } = require("./routes/note");

// servidor - Tick Note List

server.use(express.json());
server.use((req, res, next) => {
  console.log(req.url);
  next();
});

server.use(listRouter);
server.use(noteRouter);

server.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`.blue.bold.underline);
});
