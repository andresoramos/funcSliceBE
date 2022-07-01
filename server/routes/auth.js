const express = require("express");
const authController = require('../controllers/authController')
const decode = require("jwt-decode");
const { preferences } = require("@hapi/joi");

const listRouter = express.Router();

listRouter.get("/", authController);



module.exports = listRouter;
