const {pathUpdateModel} = require("../models/dataOperationsModel");


const updateNameController = async (req, res) =>{
    let {userId, newName, presentName} = req.body
    try {
        if(!userId || !newName || !presentName){
            throw new Error("Id and path name are required");
        };
        const updated = await pathUpdateModel(userId, newName, presentName);
        res.send({updated})
    } catch (error) {
        res.send({dataNotSent: true, error: error.message}) 
    }
}

module.exports = updateNameController;