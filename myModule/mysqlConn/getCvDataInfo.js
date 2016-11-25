/**
 * Created by rcp1 on 2016/11/24.
 */
var mysqlConfig=require("./mysqlconfig");
var commonData=require("../commonData/commonData");
var commonTool=require("../CommonTools/commonTool");
var stepControler=require("../CommonTools/Step");
var otherInfo=require("../mysqlConn/getOtherInfo");
var dataModel=require("../DataModel/cvDataSimpleModel");
var pool=mysqlConfig.pool;
function getAllCvData(callback) {
    pool.getConnection(function (err,conn) {
       if(err){
           console.log("POOL ==> " + err);
       }else{
           conn.query("SELECT * FROM cvdata_basicinfo",function (err,result) {
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
module.exports.getAllCvData=getAllCvData;