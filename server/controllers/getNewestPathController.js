const {getLatestPathModel} = require("../models/dataOperationsModel");


const getNewestPathController = async (req, res) =>{
    let {userId} = req.params
    try {
        if(!userId){
            throw new Error("User ID required")
        }
        const pathData = await getLatestPathModel(userId);
        if(!pathData.length){
            return res.send({newPathName: "Path 1"});
        }
    } catch (error) {
        res.send({dataNotSent: true, error: error.message}) 
    }
}

module.exports = getNewestPathController;