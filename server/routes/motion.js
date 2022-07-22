const express = require("express");
const setPointController = require('../controllers/setPointController');
const runListController = require('../controllers/runListController')
const saveListController = require('../controllers/saveListController');


const motionRouter = express.Router();

motionRouter.get("/getpoint", setPointController);
motionRouter.post("/save_list", saveListController);
motionRouter.post("/run_list", runListController);



module.exports = motionRouter;
