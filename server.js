const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const server = express();
server.use(express.json(), cors(), helmet());
server.get("/", (req, res) => {
  res.status(200).json({ message: "server online" });
});
const usersRouter = require("./api/users/usersRouter.js");
server.use("/api/users", usersRouter);
module.exports = server;
