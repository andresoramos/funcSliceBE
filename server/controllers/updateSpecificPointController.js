const {updateSpecificPointModel} = require("../models/dataOperationsModel");

const isUndefined = (item)=>{
    return item === undefined
};

const updateSpecificPointController = async (req, res) =>{
    let {userId, pathName, index, x, y, z} = req.body
    try {
        if(isUndefined(userId) || isUndefined(pathName)|| isUndefined(x) || isUndefined(y) || isUndefined(z) || isUndefined(index)){
            throw new Error("Necessary point information is missing");
        };
        const point = await updateSpecificPointModel(userId, pathName, index, x, y, z);
        if(point.modelError){
            throw new Error(point.error);
        }
        res.send({pointUpdated:true})
    } catch (error) {
        res.send({dataNotSent: true, error: error.message}) 
    }
}

module.exports = updateSpecificPointController;