const express = require("express");
const resetController = require('../controllers/testingOperationsController');
const testingOperationsRouter = express.Router();

testingOperationsRouter.get("/reset", resetController);




module.exports = testingOperationsRouter;
