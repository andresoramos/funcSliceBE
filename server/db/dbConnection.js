const mysql = require("mysql2/promise");
// const mysql = require('mysql2');
const config = require("config");
const db = config.get("db");
// const winston = require("winston");


// const connection = mysql.createConnection({
//   host: db.host,
//   user: db.user,
//   password: db.password,
//   database: db.database
// });


console.log("Creating connection pool...")
const connection = mysql.createPool({
  host: db.host,
  user: db.user,
  password: db.password,
  database: db.database
})


//   connection.connect(function(err) {
//     if (err) throw err;
//       winston.info(`Connected to ${db.database}...`);
//     connection.query("select * from users", (error, rows, fields)=>{
//       if(!!error){
//         console.log(error, "Some error")
//       }else{
//         console.log("Success", rows)
//       }
//     });
//   })
  



module.exports = connection