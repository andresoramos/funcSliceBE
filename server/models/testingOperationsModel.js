const connection = require('../db/dbConnection');



const resetModel = async ()=>{
    try {
        const resetOwnership = await connection.query('delete from ownership_table3 where id > -1;');
        const resetPoints = await connection.query('delete from points where idpoints > -1;');
        const resetTables = await connection.query('delete from tables where tableid > -1');
        return {resetComplete: true}
    } catch (error) {

        return {error}
    }

}

module.exports = {resetModel}