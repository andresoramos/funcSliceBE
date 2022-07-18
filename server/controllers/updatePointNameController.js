const {updatePointNameModel} = require("../models/dataOperationsModel");

const isUndefined = (item)=>{
    return item === undefined
};

const updatePointNameController = async (req, res) =>{
    let {userId, pathName, index, newName} = req.body
    try {
        if(isUndefined(userId) || isUndefined(pathName)|| isUndefined(index) || isUndefined(newName)){
            throw new Error("Necessary point information is missing");
        };
        const point = await updatePointNameModel(userId, pathName, index, newName);
        if(point.modelError){
            throw new Error(point.error);
        }
        res.send({pointUpdated:true})
    } catch (error) {
        res.send({dataNotSent: true, error: error.message}) 
    }
}

module.exports = updatePointNameController;