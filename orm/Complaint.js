/**
 * Created by ruichengping on 2017/4/23.
 */
const Sequelize=require('sequelize');
const sequelize=require('../config/sequelize.config');
const Complaint=sequelize.define('Complaint',{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    complaintId:{
        type:Sequelize.INTEGER
    },
    complaintName:{
        type:Sequelize.STRING
    },
    defendantId:{
        type:Sequelize.INTEGER
    },
    defendantName:{
        type:Sequelize.STRING
    },
    content:{
        type:Sequelize.STRING
    },
    status:{
        type:Sequelize.INTEGER
    },
    createTime:{
        type:Sequelize.DATE
    },
    handleResult:{
        type:Sequelize.TEXT
    },
    handleTime:{
        type:Sequelize.DATE
    }
},{
    freezeTableName:true,
    tableName:'yige_complaint',
    timestamps: false
});
module.exports=Complaint;