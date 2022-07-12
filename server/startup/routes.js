const express = require("express");
const listRouter = require("../routes/auth");
const dataOperationsRouter = require('../routes/dataOperations')
const motionRouter = require("../routes/motion");
const testingOperationsRouter = require("../routes/testingOperations")
var cors = require("cors");


// const { required } = require("@hapi/joi");

function loadAllRoutes(app) {
  console.log("ran before server")
  app.use(express.json());
  app.use(cors());
  app.use("/api/auth", listRouter);
  app.use("/api/testing_operations", testingOperationsRouter);
  app.use("/api/data_operations", dataOperationsRouter);
  app.use("/api/motion", motionRouter);
}

module.exports = loadAllRoutes;
