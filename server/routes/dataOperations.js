const express = require("express");
const getTableByUserController = require('../controllers/getTableByUserController');
const getNewestPathController = require('../controllers/getNewestPathController');
const deleteUserPathController = require('../controllers/deleteUserPathController');
const updateNameController = require('../controllers/updateNameController');
const updateSpecificPointController = require('../controllers/updateSpecificPointController');
const dataOperationsRouter = express.Router();

dataOperationsRouter.get("/get_table_by_user/:userId/:tableName", getTableByUserController);
dataOperationsRouter.get("/get_user_paths/:userId", getNewestPathController);
dataOperationsRouter.put("/delete_user_path/", deleteUserPathController)
dataOperationsRouter.put("/update_path_name/", updateNameController)
dataOperationsRouter.put("/update_point/", updateSpecificPointController)




module.exports = dataOperationsRouter;
