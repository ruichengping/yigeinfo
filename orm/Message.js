/**
 * Created by ruichengping on 2017/4/24.
 */
/**
 * Created by ruichengping on 2017/4/23.
 */
const Sequelize=require('sequelize');
const sequelize=require('../config/sequelize.config');
const Message=sequelize.define('Message',{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    promulgatorId:{
        type:Sequelize.INTEGER
    },
    promulgatorName:{
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
    remark:{
        type:Sequelize.TEXT
    },
    handleTime:{
        type:Sequelize.DATE
    }
},{
    freezeTableName:true,
    tableName:'yige_message',
    timestamps: false
});
module.exports=Message;