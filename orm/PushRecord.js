/**
 * Created by ruichengping on 2017/4/24.
 */
const Sequelize=require('sequelize');
const sequelize=require('../config/sequelize.config');
const PushRecord=sequelize.define('PushRecord',{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    companyId:{
        type:Sequelize.INTEGER
    },
    companyName:{
        type:Sequelize.STRING
    },
    pushType:{
        type:Sequelize.INTEGER
    },
    content:{
        type:Sequelize.INTEGER
    },
    createTime:{
        type:Sequelize.DATE
    }
},{
    freezeTableName:true,
    tableName:'yige_pushRecord',
    timestamps: false
});
module.exports=PushRecord;