const mysql = require('mysql');
const connection = mysql.createPool({
  host: '127.0.0.1',
  user: 'group_x',
  password: 'netpass',
  database: 'group_x'
});
module.exports = connection;