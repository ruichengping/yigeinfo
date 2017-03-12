/**
 * Created by user on 16/10/8.
 */
let mysql=require('mysql');
var pool=mysql.createPool({
    host:"112.74.190.73",
    port:"3306",
    user:"root",
    password:"123456",
    database:"yigeInfo"
});
module.exports.pool=pool;