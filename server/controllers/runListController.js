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
        if(tableCreated){
            if(tableCreated.error){
                return res.send({runFailure: true, error: "Table creation failed"});
            }
            const pointsSaved = await saveListPoints(cleanedList, emp_no, name);
            if(pointsSaved.savePointSuccess){
                const listAssigned = await assignListToOwner(pointsSaved.tableid, emp_no);
                if(!listAssigned.listAssigned){
                    return res.send({saveFailure: true, error: "List could not be assigned", errLog: listAssigned.error})
                }
                return res.send({saveFailure: false});
            }
            return res.send({saveFailure: true, error: "Point could not be saved"})
        }
            return res.send({saveFailure: true, error: "Table was not created"});
        // await connection.query(queryMap.createPathTable(name));
        
    } catch (error) {
        res.send({runFailure: true, error: error.message})
    }
}


module.exports = runListController;