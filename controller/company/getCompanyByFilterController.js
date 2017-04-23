/**
 * Created by ruichengping on 2017/4/16.
 */
/**
 * Created by ruichengping on 2017/3/17.
 */
const Company=require("../../orm/Company");
const logger=require("../../config/log4js.config");
const getFinancingStageById=require('../../tool/getFinancingStageById');
const getIndustryFieldById=require('../../tool/getIndustryFieldById');
const getProvinceById=require('../../tool/getProvinceById');
const getCityById=require('../../tool/getCityById');
const getCountryById=require('../../tool/getCountryById');
const moment = require('moment');
module.exports=(req,res,next) => {
    //筛选条件
    let filterArray=[];
    filterArray.push({
        status:{
            $eq:1
        }
    });
    if(req.body.companyName!=''){
        filterArray.push({
            companyName:{
                $like:"%"+req.body.companyName+"%"
            }
        });
    }
    if(req.body.provinceId!=''){
        filterArray.push({
            provinceId:{
                $eq:req.body.provinceId
            }
        });
    }
    if(req.body.cityId!=''){
        filterArray.push({
            cityId:{
                $eq:req.body.cityId
            }
        });
    }
    if(req.body.countryId!=''){
        filterArray.push({
            countryId:{
                $eq:req.body.countryId
            }
        });
    }
    if(req.body.financingStage!=''){
        filterArray.push({
            financingStage:{
                $eq:req.body.financingStage
            }
        });
    }
    if(req.body.industryField){
        filterArray.push({
            industryField:{
                $eq:req.body.industryField
            }
        });
    }
    if(req.body.startTime&&req.body.endTime){
        filterArray.push({
            createTime:{
                $between: [req.body.startTime, req.body.endTime],
            }
        });
    }
    if(req.body.isMember){
        filterArray.push({
            isMember:{
                $eq:req.body.isMember
            }
        });
    }
    //返回对象
    let responseObj={};
    var task1=Company.findAll({
        limit: [(req.body.pageNo-1)*20,20],
        where:{
            $and:filterArray
        }
    }).then((mysqlCompany)=>{
        logger.info("企业数据获取成功");
        let companyList=[];
        if(mysqlCompany.length>0){
            companyList=mysqlCompany.map(function (companyItem) {
                companyItem.dataValues.provinceName=getProvinceById(companyItem.provinceId).name;
                companyItem.dataValues.cityName=getCityById(companyItem.cityId).name;
                let countryName=getCountryById(companyItem.countryId).DisName;
                companyItem.dataValues.countryName=countryName;
                companyItem.dataValues.financingStageName=getFinancingStageById(companyItem.financingStage).name;
                companyItem.dataValues.industryFieldName=getIndustryFieldById(companyItem.industryField).name;
                companyItem.dataValues.createTime=moment(companyItem.dataValues.createTime).format('YYYY-MM-DD HH:mm');
                return companyItem.dataValues;
            });
        }
        responseObj.companyList=companyList;
    }).catch((error)=>{
        logger.error(error);
    });

    var task2=Company.count({
        attributes:['id']
    }).then((count)=>{
        logger.info("企业数据总数获取成功");
        responseObj.totalCount=count;
    }).catch((error)=>{
        logger.error(error);
    });

    Promise.all([task1,task2]).then(()=>{
        responseObj.success=true;
        res.send(responseObj);
    }).catch((error)=>{
        logger.error(error);
        responseObj.success=false;
        res.send(responseObj);
    });
};