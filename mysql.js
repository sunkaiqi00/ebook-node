const mysql = require('mysql');
const {  
  dbHost,
  dbUser,
  dbPwd 
} = require('./constant');
function connect() {
  return mysql.createConnection({
    host: dbHost,
    user: dbUser,
    password: dbPwd,
    database: 'book'
  });
}
module.exports = {
  connect
};
