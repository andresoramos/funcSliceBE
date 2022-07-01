const {getTableByUserModel} = require("../models/dataOperationsModel");


const getTableByUserController = async (req, res) =>{
    const {userId, tableName} = req.params
    const tableData = await getTableByUserModel(userId, tableName);
    res.send(tableData)
}

module.exports = getTableByUserController;