/**
 * Created by rcp1 on 2016/11/22.
 */
var mysqlConfig=require("./mysqlconfig");
var pool=mysqlConfig.pool;
function getAllCompanyInfo(callback) {
    pool.getConnection(function (err,conn) {
        if(err){
            console.log("POOL ==> " + err);
        }else{
            conn.query("SELECT * FROM companyinfo",function (err,result) {
                if(err){
                    throw err;
                }else{
                    callback(result);
                    conn.release();
                }
            });
        }
    });
}
module.exports.getAllCompanyInfo=getAllCompanyInfo;