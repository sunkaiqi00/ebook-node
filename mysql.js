const mysql = require('mysql');
function connect() {
  return mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'book'
  });
}
module.exports = {
  connect
};
