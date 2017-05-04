/**
 * Created by ruichengping on 2017/4/24.
 */
const moment = require('moment');
const ThirdParty=require("../../orm/ThirdParty");
const logger=require("../../config/log4js.config");
const getProvinceById=require('../../tool/getProvinceById');
const getCityById=require('../../tool/getCityById');
const getCountryById=require('../../tool/getCountryById');
module.exports=(req,res,next) => {
    //第三方类型
    let TypeObj={
        1:'学校',
        2:'政府'
    };
    //筛选条件
    let filter={
        status:1
    };
    if(req.body.thirdPartyName!=''){
        filter.thirdPartyName={
            $like:"%"+req.body.thirdPartyName+"%"
        }
    }
    if(req.body.provinceId!=''){
        filter.provinceId={
            $eq:req.body.provinceId
        }
    }
    if(req.body.cityId!=''){
        filter.cityId={
            $eq:req.body.cityId
        };
    }
    if(req.body.countryId!=''){
        filter.countryId={
            $eq:req.body.countryId
        };
    }
    if(req.body.startTime!=''&&req.body.endTime){
        filter.createTime={
            $between: [req.body.startTime, req.body.endTime]
        }
    }
    if(req.body.type!=''){
        filter.type={
            $eq:req.body.type
        }
    }
    //返回对象
    let responseObj={};
    let task1=ThirdParty.findAll({
        limit:[(req.body.pageNo-1)*20,20],
        where:filter
    }).then((mysqlThirdParty)=>{
        logger.info("第三方数据获取成功");
        let thirdPartyList=[];
        if(mysqlThirdParty.length>0) {
            thirdPartyList = mysqlThirdParty.map(function (thirdPartyItem) {
                thirdPartyItem.dataValues.provinceName = getProvinceById(thirdPartyItem.provinceId).name;
                thirdPartyItem.dataValues.cityName = getCityById(thirdPartyItem.cityId).name;
                let countryName = getCountryById(thirdPartyItem.countryId).DisName;
                thirdPartyItem.dataValues.countryName = countryName;
                thirdPartyItem.dataValues.typeName=TypeObj[thirdPartyItem.dataValues.type];
                thirdPartyItem.dataValues.createTime = moment(thirdPartyItem.dataValues.createTime).format('YYYY-MM-DD HH:mm');
                return thirdPartyItem.dataValues;
            });
        }
        responseObj.thirdPartyList=thirdPartyList;
    }).catch((error)=>{
        logger.error(error);
    });
    let task2=ThirdParty.count({
        attributes:['id']
    }).then((count)=>{
        logger.info("第三方数据总数获取成功");
        responseObj.totalCount=count;
    }).catch((error)=>{
        logger.error(error);
    });
    Promise.all([task1,task2]).then((result)=>{
        console.log(result);
        responseObj.success=true;
        res.send(responseObj);
    }).catch((error)=>{
        logger.error(error);
        responseObj.success=false;
        res.send(responseObj);
    });
};