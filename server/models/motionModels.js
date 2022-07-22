const connection = require('../db/dbConnection');
const {queryMap} = require('./queryMap');
const {getState} = require('../../zeroMQ/stateUpdates/stateUpdates');
const {messageMotionLayer} = require('../../zeroMQ/sendToMotionLayer')


const comparePoints = function(point1, point2){
   for(let key in point1){
    if(point1[key] !== point2[key]){
        return false;
    }
   }
   return true;
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
        const presentPoint = await getState();
        // Delete the fake point later and pass in first point as second arg to comparePoints
        const {x,y,z} = presentPoint;
        if(presentPoint){
            const atPosition = comparePoints(presentPoint, {x,y,z});
            if(!atPosition){
                throw new Error("Robot needs to return to starting position");
            }
            const sendStartMessageToMotionLayer = await messageMotionLayer({order: "run", list: tablePoints});
            console.log(sendStartMessageToMotionLayer);

        }
        throw new Error("Unable to get present state");
       
        
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