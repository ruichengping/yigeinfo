/**
 * Created by ruichengping on 2017/3/12.
 */
const mysql=require("mysql");
const mysqlConfig=require("../config/mysql.config");
let pool=mysql.createPool(mysqlConfig);
module.exports=(userName,password,callback) => {
    pool.getConnection((err,conn) => {
        if(err){
            throw err;
        }else{
            conn.query("SELECT password FROM users WHERE userName='"+userName+"'",(err,result) => {
                if(err){
                    throw  err;
                }else{
                    conn.release();
                    callback(result[0]);
                }
            })
        }
    });
}