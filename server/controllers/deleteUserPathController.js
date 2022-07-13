const {getLatestPathModel} = require("../models/dataOperationsModel");


const deleteUserPathController = async (req, res) =>{
    let {userId, pathName} = req.body
    try {
        if(!userId || !pathName){
            throw new Error("User ID and path name required")
        };
        const deleted = await deletePathModel(userId, pathName);
        
        res.send({deleted:true})
    } catch (error) {
        res.send({dataNotSent: true, error: error.message}) 
    }
}

module.exports = deleteUserPathController;