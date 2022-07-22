const connection = require('../db/dbConnection');
const {queryMap} = require('../models/queryMap');
const {runListModel} = require("../models/motionModels");
const {isUndefined} = require('../helpers/controllerHelpers')
const {createTableModel} = require("../models/dataOperationsModel");
const {saveListPoints, assignListToOwner} = require("../helpers/controllerHelpers")

const runListController = async (req, res) =>{
    const {body} = req;
    const {userName, pathName} = body;
    try {
    if( isUndefined(userName) || isUndefined(pathName)){
        throw new Error("Missing info");
    }
        const runList = await runListModel(userName, pathName);
        if(runList.error){
            throw new Error(runList.error.message);
        };
        return res.send({listRan: true});
        // await connection.query(queryMap.createPathTable(name));
        
    } catch (error) {
        res.send({runFailure: true, error: error.message})
    }
}


module.exports = runListController;