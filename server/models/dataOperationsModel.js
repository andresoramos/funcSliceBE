const connection = require("../db/dbConnection");
const { use } = require("../routes/dataOperations");
const {queryMap} = require('./queryMap');

const getTableByUserModel = async (userId, tableId) =>{
    try {
       const info = await connection.query(queryMap.findTableForUser(userId, tableId));
       return info[0];
        
    } catch (error) {
        return {error};
    }
};

const getLatestPathModel = async (userId)=>{
    try {
        const info = await connection.query(queryMap.findLatestPathForUser(userId));
        return info[0];
    } catch (error) {
        return {modelError: true, error:error.message}
    }
};
const deletePathModel = async (empNo, pathName)=>{
    try {
        const [info] = await connection.query(queryMap.findEmpId(empNo));
        const id = info[0]?.id;
        if(id){
            const deleted = await connection.query(queryMap.deleteUserPath(pathName, id));
            return deleted[0].changedRows;
        }
        throw new Error("Path could not be deleted")
    } catch (error) {
        return {modelError: true, error:error.message}
    }
};
const pathUpdateModel = async (userId, newName, originalName) =>{
    try {
        const [info] = await connection.query(queryMap.findEmpId(userId));
        const id = info[0]?.id;
        if(id){
            const tableExists = await connection.query(queryMap.findTableWithIDandName(id, newName));
            if(tableExists[0].length){
                throw new Error("Name already exists")
            }
            const updated = await connection.query(queryMap.updatePathName(newName, originalName, id));
            return updated[0].changedRows;
        }
        throw new Error("Path could not be updated")
    } catch (error) {
        return {modelError: true, error:error.message}
    }
};
const updateSpecificPointModel = async (userId, pathName, index, x, y, z) =>{
    try {
            const tableId = await connection.query(queryMap.getTableIdByName(userId, pathName));
            if(tableId[0] && tableId[0].length){
                const tableIdForPoints = tableId[0][0].tableid;
                const getPointId = await connection.query(queryMap.getPointList(tableIdForPoints));
                if(getPointId[0] && getPointId[0].length){
                    const pointToBeFixed = getPointId[0][index];
                    if(pointToBeFixed !== undefined){
                        const pointId = pointToBeFixed.idpoints;
                        const updatePoint = await connection.query(queryMap.updateIndividualPoint(pointId, x, y, z))
                        if(updatePoint[0] && updatePoint[0].changedRows){
                            if(updatePoint[0].changedRows > 0){
                                return true
                            }
                            throw new Error("No rows updated")
                        }
                        throw new Error("No rows updated")
                    }
                    throw new Error("Index not available in path list")
                }
                throw new Error("Table with point cannot be found");
            }
        throw new Error("Id can't be found")
    } catch (error) {
        return {modelError: true, error:error.message}
    }
};
const changeStationModel = async (userId, pathName, index, station, name) =>{
    try {
            const tableId = await connection.query(queryMap.getTableIdByName(userId, pathName));
            if(tableId[0] && tableId[0].length){
                const tableIdForPoints = tableId[0][0].tableid;
                const getPointId = await connection.query(queryMap.getPointList(tableIdForPoints));
                if(getPointId[0] && getPointId[0].length){
                    const pointToBeFixed = getPointId[0][index];
                    if(pointToBeFixed !== undefined){
                        const pointId = pointToBeFixed.idpoints;
                        const updatePoint = await connection.query(queryMap.changeStation(pointId, station ? 1 : 0, name))
                        if(updatePoint[0] && updatePoint[0].changedRows){
                            if(updatePoint[0].changedRows > 0){
                                return true
                            }
                            throw new Error("No rows updated")
                        }
                        throw new Error("No rows updated")
                    }
                    throw new Error("Index not available in path list")
                }
                throw new Error("Table with point cannot be found");
            }
        throw new Error("Id can't be found")
    } catch (error) {
        return {modelError: true, error:error.message}
    }
};
const deletePointModel = async (userId, pathName, pointIndex) =>{
    try {
            const tableId = await connection.query(queryMap.getTableIdByName(userId, pathName));
            if(tableId[0] && tableId[0].length){
                const tableIdForPoints = tableId[0][0].tableid;
                const getPointId = await connection.query(queryMap.getPointList(tableIdForPoints));
                if(getPointId[0] && getPointId[0].length){
                    const pointToBeFixed = getPointId[0][pointIndex];
                    if(pointToBeFixed !== undefined){
                        const pointId = pointToBeFixed.idpoints;
                        const updatePoint = await connection.query(queryMap.deletePoint(pointId));
                        if(updatePoint[0] && updatePoint[0].changedRows){
                            if(updatePoint[0].changedRows > 0){
                                return true
                            }
                            throw new Error("No rows updated")
                        }
                        throw new Error("No rows updated")
                    }
                    throw new Error("Index not available in path list")
                }
                throw new Error("Table with point cannot be found");
            }
        throw new Error("Id can't be found")
    } catch (error) {
        return {modelError: true, error:error.message}
    }
};
const updatePointNameModel = async (userId, pathName, index, newName) =>{
    try {
            const tableId = await connection.query(queryMap.getTableIdByName(userId, pathName));
            if(tableId[0] && tableId[0].length){
                const tableIdForPoints = tableId[0][0].tableid;
                const getPointId = await connection.query(queryMap.getPointList(tableIdForPoints));
                for(let item of getPointId[0]){
                    if(item.path_name === newName){
                        throw new Error("Two points cannot have the same name")
                    }
                }
                if(getPointId[0] && getPointId[0].length){
                    const pointToBeFixed = getPointId[0][index];
                    if(pointToBeFixed !== undefined){
                        const pointId = pointToBeFixed.idpoints;
                        const updatePoint = await connection.query(queryMap.updatePointName(pointId, newName))
                        if(updatePoint[0] && updatePoint[0].changedRows){
                            if(updatePoint[0].changedRows > 0){
                                return true
                            }
                            throw new Error("No rows updated")
                        }
                        throw new Error("No rows updated")
                    }
                    throw new Error("Index not available in path list")
                }
                throw new Error("Table with point cannot be found");
            }
        throw new Error("Id can't be found")
    } catch (error) {
        return {modelError: true, error:error.message}
    }
};

const assignListModel = async (tableid, emp_no)=>{
    try {
        const info = await connection.query(queryMap.assignList(tableid, emp_no));
        if(info && info.length){
            return {listAssigned: true}
        }
        throw new Error("Error occurred while assigning list.")
    } catch (error) {
        return {listAssigned: false, error}
    }
}

const createTableModel = async (name, emp_no)=>{
    try {
        const created =  await connection.query(queryMap.createPathTable(name, emp_no));
        return created[0].insertId ? true: false;
    } catch (error) {
        return {error}
    }
};




module.exports = {getTableByUserModel, updatePointNameModel, 
     updateSpecificPointModel, deletePointModel, 
     createTableModel, assignListModel, changeStationModel,
     pathUpdateModel, getLatestPathModel, deletePathModel};