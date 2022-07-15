const {getSpecificPointModel} = require("../models/dataOperationsModel");


const getSpecificPointController = async (req, res) =>{
    let {userId, pathName, index} = req.params
    try {
        if(!userId || !pathName || !index){
            throw new Error("Necessary point information is missing");
        };
        const point = await getSpecificPointModel(userId, pathName, index);
        if(updated.modelError){
            throw new Error("Path update failed");
        }
        res.send({updated})
    } catch (error) {
        res.send({dataNotSent: true, error: error.message}) 
    }
}

module.exports = getSpecificPointController;