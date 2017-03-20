/**
 * Created by ruichengping on 2017/3/20.
 */
const mysql=require("mysql");
const mysqlConfig=require("../../config/mysql.config.js");
let pool=mysql.createPool(mysqlConfig);
module.exports=(jobModel,jobId,callback) => {
    pool.getConnection((err,conn) => {
        if(err){
            throw err;
        }else{
            let keyValueArray=[];
            for(let key of Object.keys(jobModel)){
                let keyValueItemStr='';
                if(isNaN(jobModel[key])){
                    keyValueItemStr=key+"='"+jobModel[key]+"'";
                }else{
                    keyValueItemStr=key+"="+jobModel[key];
                }
                keyValueArray.push(keyValueItemStr);
            }
            let keyValueStr=keyValueArray.join(",");
            let sql=`UPDATE yige_job SET ${keyValueStr} WHERE id=${jobId}`;
            conn.query(sql,(err,result) => {
                if(err){
                    throw err;
                }else{
                    callback(result);
                    conn.release();
                }
            });
        }
    });
};