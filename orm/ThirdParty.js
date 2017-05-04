/**
 * Created by ruichengping on 2017/4/24.
 */
/**
 * Created by ruichengping on 2017/4/12.
 */
const Sequelize=require('sequelize');
const sequelize=require('../config/sequelize.config');
const ThirdParty=sequelize.define('ThirdParty',{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    thirdPartyName:{
        type:Sequelize.STRING
    },
    type:{
        type:Sequelize.INTEGER,
    },
    provinceId:{
        type:Sequelize.INTEGER
    },
    cityId:{
        type:Sequelize.INTEGER
    },
    countryId:{
        type:Sequelize.INTEGER
    },
    createTime:{
        type:Sequelize.DATE
    },
    address:{
        type:Sequelize.STRING
    },
    homeUrl:{
        type:Sequelize.STRING
    },
    status:{
        type:Sequelize.INTEGER
    }
},{
    freezeTableName:true,
    tableName:'yige_thirdParty',
    timestamps: false
});
module.exports=ThirdParty;