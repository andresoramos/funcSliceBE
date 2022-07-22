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

const runListModel = async (userId, pathName)=>{
    try {
         const [info] = await connection.query(queryMap.findEmpId(userId));
        const id = info[0]?.id;
        if(id === undefined){
            throw new Error("User cannot be found");
        }
        const table_id = await connection.query(queryMap.getTableIdByName(userId, pathName));
        let tableid;
        if(table_id[0].length){
            tableid = table_id[0][0].tableid;
        } else {
            throw new Error("Table cannot be found");
        }
        const tablePoints = await connection.query(queryMap.getPointList(tableid));
        let firstPoint;
        if(tablePoints[0] && tablePoints[0].length){
            firstPoint = tablePoints[0][0];
        }else{
            throw new Error(`No points available for ${pathName}`)
        }
        console.log(firstPoint)
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

module.exports = {runListModel}

    // try {
    //     const [info] = await connection.query(queryMap.findEmpId(userId));
    //     const id = info[0]?.id;
    //     if(id){
    //         const tableExists = await connection.query(queryMap.findTableWithIDandName(id, newName));
    //         if(tableExists[0].length){
    //             throw new Error("Name already exists")
    //         }
    //         const updated = await connection.query(queryMap.updatePathName(newName, originalName, id));
    //         return updated[0].changedRows;
    //     }
    //     throw new Error("Path could not be updated")
    // } catch (error) {
    //     return {modelError: true, error:error.message}
    // }