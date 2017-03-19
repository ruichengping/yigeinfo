/**
 * Created by ruichengping on 2017/3/19.
 */
const mysql=require("mysql");
const mysqlConfig=require("../../config/mysql.config.js");
let pool=mysql.createPool(mysqlConfig);
module.exports=(companyModel,companyId,callback) => {
    pool.getConnection((err,conn) => {
        if(err){
            throw err;
        }else{
            let keyValueArray=[];
            for(let key of Object.keys(companyModel)){
                let keyValueItemStr='';
                if(isNaN(companyModel[key])){
                    keyValueItemStr=key+"='"+companyModel[key]+"'";
                }else{
                    keyValueItemStr=key+"="+companyModel[key];
                }
               keyValueArray.push(keyValueItemStr);
            }
            let keyValueStr=keyValueArray.join(",");
            let sql=`UPDATE yige_company SET ${keyValueStr} WHERE id=${companyId}`;
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