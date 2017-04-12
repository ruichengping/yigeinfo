/**
 * Created by wuming on 2017/4/12.
 */
const mysqlConfig=require('./mysql.config');
const Sequelize=require('sequelize');
const sequelize=new Sequelize(mysqlConfig.database,mysqlConfig.user,mysqlConfig.password,{
    host:mysqlConfig.host,
    dialect:'mysql',
    pool:{
        max:5,
        min:0,
        idle:10000
    }
});
module.exports=sequelize