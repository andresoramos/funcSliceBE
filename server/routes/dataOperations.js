const express = require("express");
const getTableByUserController = require('../controllers/getTableByUserController');
const getNewestPathController = require('../controllers/getNewestPathController')
const dataOperationsRouter = express.Router();

dataOperationsRouter.get("/get_table_by_user/:userId/:tableName", getTableByUserController);
dataOperationsRouter.get("/get_user_paths/:userId", getNewestPathController);




module.exports = dataOperationsRouter;
