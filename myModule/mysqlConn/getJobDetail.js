/**
 * Created by user on 16/10/14.
 */
var mysql=require("./mysqlconfig");
var pool=mysql.pool;
function getJobDetail(id,callback) {
    pool.getConnection(function (err,conn) {
        if(err){
            console.log("POOL ==> " + err);
        }else{
            conn.query("SELECT * FROM job WHERE jobId='"+id+"'",function (err,result) {
                if(err){
                    throw err;
                }else{
                    callback(result);
                }
                conn.release();
            });
        }
    });
}
function getAllJobDeatil(callback) {
    pool.getConnection(function (err,conn) {
       if(err){
           console.log("POOL ==> " + err);
       }else{
        conn.query("SELECT * FROM job",function (err,result) {
            if(err){
                throw err;
            }else{
                callback(result);
                conn.release();
            }
        }) ;
       }
    });
}
module.exports.getAllJobDeatil=getAllJobDeatil;
module.exports.getJobDetail=getJobDetail;