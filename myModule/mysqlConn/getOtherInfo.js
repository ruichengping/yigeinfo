/**
 * Created by user on 16/10/17.
 */
var mysql=require("./mysqlconfig");
var commonTool=require("../CommonTools/commonTool");
var pool=mysql.pool;
//获取公司名称
function getCompanyName(id,callback) {
    pool.getConnection(function (err,conn) {
        if(err){
            console.log("POOL ==> " + err);
        }else{
            conn.query("SELECT name FROM companyInfo where companyId='"+id+"'",function (err,result) {
                if(err){
                    throw  err;
                }else{
                    callback(result[0].name);
                    conn.release();
                }
            });
        }
    });
}
//获取特定的HR的ID对应的姓名
function getHrName(id,callback) {
    pool.getConnection(function (err,conn) {
        if(err){
            console.log("POOL ==> " + err);
        }
        conn.query("SELECT name FROM hrInfo WHERE id='"+id+"'",function (err,result) {
            if(err){
                throw  err;
            }
            callback(result[0].name);
            conn.release();
        });

    });
}
//获取特定城市ID对应的城市名称
function getCityName(id,callback) {
    pool.getConnection(function (err,conn) {
        if(err){
            console.log("POOL ==> " + err);
        }
        conn.query("SELECT cityName FROM cities WHERE cityId='"+id+"'",function (err,result) {
            if(err){
                throw  err;
            }else{
                callback(result[0].cityName);
                conn.release();
            }
        });
    });
}
//获取特定行政区ID对应的行政区名称
function getDistrictName(id,callback) {
    pool.getConnection(function (err,conn) {
        if(err){
            console.log("POOL ==> " + err);
        }
        conn.query("SELECT districtName FROM districts WHERE districtId='"+id+"'",function (err,result) {
            if(err){
                throw  err;
            }else{
                callback(result[0].districtName);
                conn.release();
            }
        })
    });
}
//获取所有城市的名称
function getCities(callback) {
    pool.getConnection(function (err, conn) {
        if (err){
            console.log("POOL ==> " + err);
        }
        else {
            conn.query("SELECT * FROM cities", function (err, result) {
                if (err) {
                    throw  err;
                } else {
                    callback(result);
                    conn.release();
                }
            });
        }
    });
};
//获取特定城市对应的所有行政区
function getDistricts(cityId,callback) {
    pool.getConnection(function (err, conn) {
        if (err) {
            console.log("POOL ==> " + err);
        }
        conn.query("SELECT * FROM districts WHERE cityId='"+cityId+"'",function (err,result) {
            if(err){
                throw  err;
            }else{
                callback(result);
                conn.release();
            }
        });
    });
};
//获取公司信息
function getCompanyInfo(id,callback) {
    pool.getConnection(function (err,conn) {
        if(err){
            console.log("POOL ==> " + err);
        }
        conn.query("SELECT * FROM companyInfo WHERE companyId='"+id+"'",function (err,result) {
            if(err){
                throw  err;
            }else{
                callback(result[0]);
                conn.release();
            }
        });
    });
}
//获取面试评价
function getEvaluationInfo(id,callback) {
    pool.getConnection(function (err,conn) {
        if(err){
            console.log("POOL ==> " + err);
        }
        conn.query("SELECT * FROM evaluationInfo WHERE jobId='"+id+"'",function (err,result) {
            if(err){
                throw  err
            }else{
                for(var i=0;i<result.length;i++){
                    result[i].date=commonTool.showDate(result[i].date);
                }
                callback(result);
                conn.release();
            }
        });
    });
}
// getEvaluationInfo(1001,function (result) {
//     console.log(result);
// });
//获取印象标签
function getEvaluationLabels(id,callback) {
    pool.getConnection(function (err,conn) {
       if(err){
           console.log("POOL ==> " + err);
       }
       conn.query("SELECT name FROM evaluationLabels WHERE id='"+"'",function (err,result) {
           if(err){
               throw  err
           }else{
               callback(result[0].name);
               conn.release();
           }
       });
    });
}
getCompanyName(1,function (result) {
   console.log(result)
});
module.exports.getCities=getCities;
module.exports.getCityName=getCityName;
module.exports.getDistricts=getDistricts;
module.exports.getDistrictName=getDistrictName;
module.exports.getCompanyName=getCompanyName;
module.exports.getHrName=getHrName;
module.exports.getCompanyInfo=getCompanyInfo;
module.exports.getEvaluationInfo=getEvaluationInfo;
module.exports.getEvaluationLabels=getEvaluationLabels;