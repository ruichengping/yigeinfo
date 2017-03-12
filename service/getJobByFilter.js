/**
 * Created by ruichengping on 2017/3/12.
 */
const mysql=require("mysql");
const mysqlConfig=require("../config/mysql.config");
let pool=mysql.createPool(mysqlConfig);
module.exports=(filter) => {

}