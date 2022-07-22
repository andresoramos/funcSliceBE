const {savePointModel} = require("../models/savePointModel")
const {assignListModel} = require("../models/dataOperationsModel")
const saveListPoints = async (list, emp_no, name)=>{
    let tableid;
    for(let i = 0; i < list.length; i++){
        let item = list[i]
        let ind = i;
        let coordinates = item.vector;
        let {station} = item;
        let pathName = item.name;
        const pointSaved = await savePointModel(ind, coordinates, station, emp_no, name, pathName); 
        if(!pointSaved  || pointSaved.error){
            return {savePointSuccess: false}
        }
        if(tableid === undefined){
            tableid = pointSaved.tableid;
        }
    }
    return {savePointSuccess: true, tableid}
};
const assignListToOwner = async (tableid, emp_no)=>{
    try {
        const listAssigned = await assignListModel(tableid, emp_no);
        if(listAssigned.listAssigned){
            return {listAssigned:true}
        }
        throw new Error("List could not be assigned to owner")
        
    } catch (error) {
        return {listAssigned: false, error}
    }
};
const isUndefined = (item)=>{
    return item === undefined
};

module.exports = {saveListPoints, isUndefined, assignListToOwner}