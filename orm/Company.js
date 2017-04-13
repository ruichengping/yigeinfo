/**
 * Created by wuming on 2017/4/13.
 */
const Sequelize=require('sequelize');
const sequelize=require('../config/sequelize.config');
var Company=sequelize.define("",{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true
    },
    companyName:{
        type:Sequelize.STRING
    },
    financingStage:{
        type:Sequelize.INTEGER
    },
    industryField:{
        type:Sequelize.STRING
    },
    employeeNum:{
        type:Sequelize.INTEGER
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
    address:{
        type:Sequelize.STRING
    },
    companyWord:{
        type:Sequelize.STRING
    },
    introduction:{
        type:Sequelize.TEXT('long')
    },
    createTime:{
        type:Sequelize.DATE
    }
},{
    freezeTableName:true,
    tableName:'yige_company',
    timestamps: false
});
module.exports=Company;