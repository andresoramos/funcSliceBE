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
const deletePathModel = async (userId, empNo)=>{
    try {
        const [info] = await connection.query(queryMap.findEmpId(empNo));
        const id = info[0]?.id;
        if(id){
            const deleted = await connection.query(queryMap.deleteUserPath());
            return true
        }
        throw new Error("Path could not be deleted")
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




module.exports = {getTableByUserModel, createTableModel, assignListModel, getLatestPathModel, deletePathModel};