/**
 * Created by wuming on 2017/4/12.
 */
const Sequelize=require('sequelize');
const sequelize=require('../config/sequelize.config');
const User=sequelize.define('user',{
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
module.exports=User;