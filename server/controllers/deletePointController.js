const {deletePointModel} = require("../models/dataOperationsModel");

const isUndefined = (item)=>{
    return item === undefined
};

const deletePointController = async (req, res) =>{
    let {userId, pathName, pointIndex} = req.body
    try {
        if(isUndefined(userId) || isUndefined(pathName)|| isUndefined(pointIndex)){
            throw new Error("Necessary information for update is missing");
        };
        const pointDeleted = await deletePointModel(userId, pathName, pointIndex);
        if(pointDeleted.error){
            throw new Error("New point could not be saved");
        }
        res.send({pointDeleted:true})
    } catch (error) {
        res.send({dataNotSent: true, error: error.message}) 
    }
}

module.exports = deletePointController;