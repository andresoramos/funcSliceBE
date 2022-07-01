const express = require("express");
const setPointController = require('../controllers/setPointController')
const saveListController = require('../controllers/saveListController')


const motionRouter = express.Router();

motionRouter.get("/getpoint", setPointController);
motionRouter.post("/save_list", saveListController);



module.exports = motionRouter;
