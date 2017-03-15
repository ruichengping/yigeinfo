/**
 * Created by ruichengping on 2017/3/15.
 */
const mysql=require("mysql");
const mysqlConfig=require("../../config/mysql.config.js");
let pool=mysql.createPool(mysqlConfig);
module.exports=(jobModel,callback) => {
  pool.getConnection((err,conn) => {
      if(err){
          throw err;
      }else{
          let keyArray=[];
          let valueArray=[];
          for(let key of Object.keys(jobModel)){
              keyArray.push(key);
              if(isNaN(jobModel[key])){
                  valueArray.push(`'${jobModel[key]}'`);
              }else{
                  valueArray.push(jobModel[key]);
              }
          }
          let keyStr=keyArray.join(",");
          let valueStr=valueArray.join(",");
          let sql=`INSERT INTO yige_company (${keyStr}) VALUES (${valueStr})`;
          conn.query(sql,(err,result) => {
             if(err){
                 throw err;
             }else{
                 callback(result.insertId);
                 conn.release();
             }
          });
      }
  });
};