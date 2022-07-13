const {getTableByUserModel} = require("../models/dataOperationsModel");


const getNewestPathController = async (req, res) =>{
    const {userId} = req.params
    try {
        if(!userId){
            throw new Error("User ID required")
        }
        const tableData = await getTableByUserModel(userId, tableName);
        res.send(tableData)
        
    } catch (error) {
        res.send({dataNotSent: true}) 
    }
}

module.exports = getNewestPathController;