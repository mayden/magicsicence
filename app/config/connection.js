const mysql = require('mysql');

/*
const pool = mysql.createPool({
  host     : 'localhost',
  user     : 'alex',
  password : 'alex',
  database : 'magic'
});
*/


const pool = mysql.createPool({
  host     : 'eu-cdbr-west-01.cleardb.com',
  user     : 'b835960891cfda',
  password : '1d0ff79f',
  database : 'heroku_66f5d752fc89ed5'
});


module.exports = pool;
