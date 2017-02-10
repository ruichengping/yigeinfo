/**
 * Created by rcp1 on 2016/11/29.
 */
var mysqlConfig=require("./mysqlconfig");
var pool=mysqlConfig.pool;

function getAllResourcesUrl(callback) {
    pool.getConnection(function (err,conn) {
        if(err){
            console.log("POOL ==> " + err);
        }else{
            conn.query("SELECT * FROM resourcesUrl",function (err,result) {
                callback(result);
                conn.release();
            });
        }
    });
}
function insertResourcesUrl(urlArray,callback) {
    var index;
    var sqlStr=[];
    getAllResourcesUrl(function (result) {
        index=result.length+1;
        for(var i=0;i<urlArray.length;i++){
            sqlStr.push("("+index+",'"+urlArray[i]+"')");
            index++;
        }
        pool.getConnection(function (err,conn) {
            if(err){
                console.log("POOL ==> " + err);
            }else{
                conn.query("INSERT INTO resourcesUrl VALUES"+sqlStr.join(","),function (err,result) {
                    callback(result);
                    conn.release();
                });
            }
        });
    });
}
module.exports.getAllResourcesUrl=getAllResourcesUrl;
module.exports.insertResourcesUrl=insertResourcesUrl;