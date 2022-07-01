const express = require("express");
const getTableByUserController = require('../controllers/getTableByUserController');
const dataOperationsRouter = express.Router();

dataOperationsRouter.get("/get_table_by_user/:userId/:tableName", getTableByUserController);




module.exports = dataOperationsRouter;
