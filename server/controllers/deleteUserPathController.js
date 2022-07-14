const {deletePathModel} = require("../models/dataOperationsModel");


const deleteUserPathController = async (req, res) =>{
    let {userId, pathName} = req.body
    try {
        if(!userId || !pathName){
            throw new Error("User ID and path name required");
        };
        const success = await deletePathModel(userId, pathName);
        if(success){
            res.send({updateCompleted: true})
        }
        throw new Error("Path could not be deleted")
    } catch (error) {
        res.send({dataNotSent: true, error: error.message}) 
    }
}

module.exports = deleteUserPathController;