/**
 * Created by ruichengping on 2017/3/19.
 */
const mysql=require("mysql");
const mysqlConfig=require("../../config/mysql.config.js");
let pool=mysql.createPool(mysqlConfig);
module.exports=(companyId,callback) => {
  pool.getConnection((err,conn) => {
      if(err){
          throw err;
      }else{
          let sql=`SELECT * FROM yige_company WHERE id=${companyId};`;
          conn.query(sql,(err,result) => {
              if(err){
                  throw err;
              }else{
                  callback(result[0]);
                  conn.release();
              }
          });
      }
  })
};