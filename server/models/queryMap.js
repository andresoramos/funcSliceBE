const queryMap = {
    createPathTable: (tableName, owner_id)=>{
        return `insert INTO tables (table_name, owner_id)
        VALUES ('${tableName}', (select id from users where emp_no = '${owner_id}' limit 1));`
    },
    assignList: (tableid, emp_no)=>{
        return `insert into ownership_table3 (table_id, owner_id) values (${tableid}, (select id from users where emp_no = '${emp_no}') )`
    }, 
    updatePathName: (newName, originalName, owner_id)=>{
        return `update tables set table_name = '${newName}' where table_name = '${originalName}' and owner_id = ${owner_id}`
    }, 
    getTableId: (name, owner_id)=>{
        return `select tableid from tables where table_name = '${name}' and owner_id = ${owner_id}`
    }, 
    findLatestPathForUser: (userId)=>{
        return `select t.table_name from tables t
                join users u on t.owner_id = u.id
                where u.emp_no = '${userId}' and  t.deleted != 'yes'`
    },
    findEmpId: (empNo)=>{
        return `select id from users where emp_no = '${empNo}' `
    },
    deleteUserPath: (table_name, owner_id)=>{
        return `update tables set deleted = 'yes' where table_name = '${table_name}' and owner_id = ${owner_id}`
    },

    findTableForUser: (userId, tableName)=>{
        console.log("findTable ran")
        return `select u.emp_no, t.table_name from ownership_table3 o
        join users u on u.id = o.owner_id
        join tables t on t.tableid = o.table_id
        where u.emp_no = '${userId}' and t.table_name = '${tableName}'`
    },
    addPoint: (tableId, ind, x, y, z, station, emp_no)=>{
        console.log("addPoint ran")
        return `insert into points (table_id, station, x, y, z, ind, emp_no) values (${tableId},${station},${x},${y},${z},${ind}, (select id from users where emp_no = '${emp_no}' limit 1))`
    },
    getTableIdByName: (emp_no, name)=>{
        console.log("getTableIdByName ran")
        return `select t.tableid from tables t
        join users u on u.id = t.owner_id
        where u.emp_no = '${emp_no}' and t.table_name = '${name}'`
    }
};

module.exports = {queryMap}