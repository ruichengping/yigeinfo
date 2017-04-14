/**
 * Created by wuming on 2017/4/12.
 */
const Sequelize=require('sequelize');
const sequelize=require('../config/sequelize.config');
const User=sequelize.define('user',{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true
    },
    userId:{
        type:Sequelize.STRING,
    },
    userName:{
        type:Sequelize.STRING
    },
    password:{
        type:Sequelize.STRING
    }
},{
    freezeTableName:true,
    tableName:'yige_user',
    timestamps: false
});
module.exports=User;