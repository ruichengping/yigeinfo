/**
 * Created by user on 16/10/8.
 */
var mysql=require('mysql');
var pool=mysql.createPool({
    host:"localhost",
    port:"3306",
    user:"root",
    password:"123456",
    database:"yigeInfo"
});
module.exports.pool=pool;