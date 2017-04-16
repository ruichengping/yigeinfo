/**
 * Created by wuming on 2017/4/10.
 */
var mysqlConfig=require('../config/mysql.config');
var Sequelize=require('sequelize');
var sequelize=new Sequelize(mysqlConfig.database,mysqlConfig.user,mysqlConfig.password,{
    host:mysqlConfig.host,
    dialect:'mysql',
    pool:{
        max:5,
        min:0,
        idle:10000
    }
});
var Company=require('../orm/Company');
Company.findAll({
    where:{
        companyName:{
            $like:'%卖%'
        },

    }
}).then((mysqlCompany)=>{
    console.log(mysqlCompany);
}).catch((error)=>{
    console.log(error);
});
