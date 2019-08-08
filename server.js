const express = require("express");

const carsRouter = require("./cars/cars-router.js");

const server = express();

server.use(express.json());
server.use(logger);

server.use("/api/cars", carsRouter);

server.use(errHandler);

function errHandler(err, req, res, next) {
  res.status(err.status).json({ message: err.message });
}

function logger(req, res, next) {
  console.log(`[${new Date().toISOString()}] ${req.method} to ${req.url}`);
  next();
}

module.exports = server;
