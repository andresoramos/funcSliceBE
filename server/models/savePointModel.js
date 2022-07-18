const connection = require('../db/dbConnection');
const {queryMap} = require('./queryMap')

const validModelArgs = function(ind, x,y,z, station, emp_no, tableName, pathName){
    for(let key in arguments){
        if(arguments[key] === undefined){
            return false;
        }
    };
    return true
}

const savePointModel = async (ind, coordinates, station, emp_no, tableName, pathName)=>{
    try {
        // console.log("Test",queryMap.getTableIdByName(emp_no, tableName))
        const {x,y,z} = coordinates;
        if(!validModelArgs(ind, x, y, z, station, emp_no, tableName, pathName)){
            return false;
        }
        const table_id = await connection.query(queryMap.getTableIdByName(emp_no, tableName));
        let tableid;
        if(table_id[0].length){
            tableid = table_id[0][0].tableid;
        } else {
            return false
        }
        const pointSaved = await connection.query(queryMap.addPoint(tableid, ind, x, y, z, station, emp_no, pathName));
        if(pointSaved){
            return {pointSaved:true, tableid}
        }
        return false;
        // (tableId, ind, x, y, z, station, emp_no)
        
    } catch (error) {
        console.log(error, "This is the error")
        return {error}
    }

}

module.exports = {savePointModel}