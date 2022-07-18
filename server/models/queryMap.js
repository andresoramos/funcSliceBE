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
        return `select tableid from tables where table_name = '${name}' and owner_id = ${owner_id} and deleted = 'No'`
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
    addPoint: (tableId, ind, x, y, z, station, emp_no, path_name)=>{
        return `insert into points (table_id, station, x, y, z, ind, emp_no, path_name) values (${tableId},${station},${x},${y},${z},${ind}, (select id from users where emp_no = '${emp_no}' limit 1), ${path_name})`
    },
    getPointList: (table_id)=>{ 
        return `select * from points where table_id = ${table_id}`
    },
    updateIndividualPoint: (id, x, y, z)=>{ 
        return `update points set x = ${x}, y = ${y}, z = ${z} where idpoints = ${id}`
    },
    updatePointName: (id, newName)=>{ 
        return `update points set x = ${x}, y = ${y}, z = ${z} where idpoints = ${id}`
    },
    getTableIdByName: (emp_no, name)=>{
        return `select t.tableid from tables t
        join users u on u.id = t.owner_id
        where u.emp_no = '${emp_no}' and t.table_name = '${name}' and t.deleted = 'No'`
    }
};

module.exports = {queryMap}