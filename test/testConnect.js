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
var user=sequelize.define('users',{
    userId:{
        type:Sequelize.STRING,
        primaryKey:true
    },
    userName:{
        type:Sequelize.STRING
    },
    password:{
        type:Sequelize.STRING
    }
},{
    timestamps: false
});
user.findAll({
    where:{
        userName:'admin'
    }
}).then(function (result) {
    console.log(result);
});
