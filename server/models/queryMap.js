const queryMap = {
    createPathTable: (tableName, owner_id)=>{
        console.log("createPathTable ran", tableName, owner_id)
        return `insert INTO tables (table_name, owner_id)
        VALUES ('${tableName}', (select id from users where emp_no = '${owner_id}' limit 1));`
    },
    assignList: (tableid, emp_no)=>{
        console.log("assignList ran");
        return `insert into ownership_table3 (table_id, owner_id) values (${tableid}, (select id from users where emp_no = '${emp_no}') )`
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