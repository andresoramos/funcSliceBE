const {deletePathModel} = require("../models/dataOperationsModel");


const updateNameController = async (req, res) =>{
    let {userId, newName} = req.body
    try {
        if(!userId || ! newName){
            throw new Error("Id and path name are required");
        };
        const updated = await pathUpdateModel(userId, newName);
        res.send({sent:true})
    } catch (error) {
        res.send({dataNotSent: true, error: error.message}) 
    }
}

module.exports = updateNameController;