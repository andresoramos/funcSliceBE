const {changeStationModel} = require("../models/dataOperationsModel");

const isUndefined = (item)=>{
    return item === undefined
};

const changeStationController = async (req, res) =>{
    let {userId, pathName, pointIndex, station, name} = req.body
    try {
        if(isUndefined(userId) || isUndefined(pathName)|| isUndefined(pointIndex) || isUndefined(name) || isUndefined(station)){
            throw new Error("Necessary information for update is missing");
        };
        const pointDeleted = await changeStationModel(userId, pathName, pointIndex, station, name);
        if(pointDeleted.error){
            throw new Error("New point could not be saved");
        }
        res.send({stationChanged:true})
    } catch (error) {
        res.send({dataNotSent: true, error: error.message}) 
    }
}

module.exports = changeStationController;