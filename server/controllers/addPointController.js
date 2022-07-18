const {savePointModel} = require("../models/savePointModel");

const isUndefined = (item)=>{
    return item === undefined
};

const pointIsInvalid = (point)=>{
    const checkObj = {index: true, vector: true, station: true, name: true};
    for(let key in checkObj){
        if(point[key] === undefined){
            return true;
        }
    }
    return false;
}

const addPointController = async (req, res) =>{
    let {userId, pathName, point} = req.body
    try {
        if(isUndefined(userId) || isUndefined(pathName)|| pointIsInvalid(point)){
            throw new Error("Necessary information for update is missing");
        };
        const {index, station, name, vector} = point;
        const pointAdded = await savePointModel(index, vector, station, userId, pathName, name);
        if(!pointAdded){
            throw new Error("New point could not be saved");
        }
        res.send({pointUpdated:true})
    } catch (error) {
        res.send({dataNotSent: true, error: error.message}) 
    }
}

module.exports = addPointController;