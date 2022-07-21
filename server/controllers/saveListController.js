const connection = require('../db/dbConnection');
const {queryMap} = require('../models/queryMap');
const {createTableModel} = require("../models/dataOperationsModel");
const {saveListPoints, assignListToOwner} = require("../helpers/controllerHelpers")

const saveListController = async (req, res) =>{
    const {body} = req;
    const {payload} = body;
    const {name, cleanedList, emp_no} = payload;
    if(!name || !cleanedList){
        return res.send({saveFailure: true, error: "Missing info"});
    }
    try {
        const tableCreated = await createTableModel(name, emp_no);
        if(tableCreated){
            if(tableCreated.error){
                return res.send({saveFailure: true, error: "Table creation failed"});
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
        res.send({saveFailure: true, error: "Error occurred while saving list.  Refer to logs for details.", errLog: error })
    }
    // First, search that a table doesn't have the same name and owner; If so, send back a 401 as a bad request
    // Then create a table with the passed in name and owner
    // Get back from this the number of the table, and use it to create points for the table
}


module.exports = saveListController;