/**
 * Created by rcp1 on 2016/11/7.
 */
var mysql=require("./mysqlconfig");
var pool=mysql.pool;
//获取指定的第三方信息
function getGovAndSchInfo(id,callback) {
    pool.getConnection(function (err,conn) {
       if(err){
           console.log("POOL ==> " + err);
       }else{
           conn.query("SELECT * FROM governmentAndSchool WHERE id='"+id+"'",function (err,result) {
                if(err){
                    throw err;
                }else{
                    callback(result[0]);
                    conn.release();
                }
           });
       }
    });
}
//获取所有第三方信息
function getAllGovAndSchInfo(callback) {
    pool.getConnection(function (err,conn) {
        if(err){
            console.log("POOL ==> " + err);
        }else{
            conn.query("SELECT * FROM governmentAndSchool",function (err,result) {
                if(err){
                    throw err;
                }else{
                    for(var i=0;i<result.length;i++){
                       if(result[i].type==1){
                           result[i].type="学校";
                       }else if(result[i].type="政府"){
                           result[i].type="政府";
                       }
                    }
                    callback(result);
                    conn.release();
                }
            });
        }
    });
}
function searchThirdParty(searchText,cityId,districtId,type,callback) {
    var obj={
        "cityId":cityId,
        "districtId":districtId,
        "type":type
    }
    if(obj.cityId==-1){
        delete obj.cityId;
    }
    if(obj.districtId=="0"){
        delete obj.districtId;
    }
    if(obj.type=="0"){
        delete  obj.type;
    }
    pool.getConnection(function (err,conn) {
        if(err){
            console.log("POOL ==> " + err);
        }else{
            var str=[];
            if(searchText!=""){
                str.push("SELECT * FROM governmentandschool WHERE name like '%"+searchText+"%'");
                for(attr in obj){
                    str.push(attr+"='"+obj[attr]+"'");
                }
            }else{
                if(obj.length==0){
                    str="SELECT * FROM governmentAndSchool";
                }else{
                    str.push("SELECT * FROM governmentandschool WHERE 1=1");
                    for(attr in obj){
                        str.push(attr+"='"+obj[attr]+"'");
                    }
                }
            }
            conn.query(str.join(" AND "),function (err,result) {
               if(err){
                   throw  err;
               } else{
                   callback(result);
                   conn.release();
               }
            });
        }
    });
}
module.exports.searchThirdParty=searchThirdParty;
module.exports.getGovAndSchInfo=getGovAndSchInfo;
module.exports.getAllGovAndSchInfo=getAllGovAndSchInfo;