/**
 * Created by ruichengping on 2017/4/22.
 */
const Job=require('../../orm/Job');
const logger=require("../../config/log4js.config");
const getProvinceById=require('../../tool/getProvinceById');
const getCityById=require('../../tool/getCityById');
const getCountryById=require('../../tool/getCountryById');
const getWorkExperienceById=require('../../tool/getWorkExperienceById');
const getEducationById=require('../../tool/getEducationById');
const getJobNatureById=require('../../tool/getJobNatureById');
const getSalaryLevelById=require('../../tool/getSalaryLevelById');
const moment = require('moment');
module.exports=(req,res,next) => {
    //筛选条件
    let filter={
        status:1
    };
    if(req.body.jobName!=''){
        filter.jobName={
            $like:"%"+req.body.jobName+"%"
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
    if(req.body.experience!=''){
        filter.experience={
            $eq:req.body.experience
        }
    }
    if(req.body.education!=''){
        filter.education={
            $eq:req.body.education
        }
    }
    if(req.body.startTime!=''&&req.body.endTime){
        filter.createTime={
            $between: [req.body.startTime, req.body.endTime]
        }
    }
    if(req.body.salary!=''){
        filter.salary={
            $eq:req.body.salary
        }
    }
    if(req.body.jobNature!=''){
        filter.jobNature={
            $eq:req.body.jobNature
        }
    }
    //返回对象
    let responseObj={};
    let task1=Job.findAll({
        limit:[(req.body.pageNo-1)*20,20],
        where:filter
    }).then((mysqlJob)=>{
        logger.info("企业数据获取成功");
        let jobList=[];
        if(mysqlJob.length>0) {
            jobList = mysqlJob.map(function (jobItem) {
                jobItem.dataValues.provinceName = getProvinceById(jobItem.provinceId).name;
                jobItem.dataValues.cityName = getCityById(jobItem.cityId).name;
                let countryName = getCountryById(jobItem.countryId).DisName;
                jobItem.dataValues.countryName = countryName;
                jobItem.dataValues.experienceName = getWorkExperienceById(jobItem.experience).name;
                jobItem.dataValues.educationName = getEducationById(jobItem.education).name;
                jobItem.dataValues.salaryName = getSalaryLevelById(jobItem.salary).name;
                jobItem.dataValues.jobNatureName = getJobNatureById(jobItem.jobNature).name;
                jobItem.dataValues.createTime = moment(jobItem.dataValues.createTime).format('YYYY-MM-DD HH:mm');
                return jobItem.dataValues;
            });
        }
            responseObj.jobList=jobList;
    }).catch((error)=>{
        logger.error(error);
    });
    let task2=Job.count({
        attributes:['id']
    }).then((count)=>{
        logger.info("职位数据总数获取成功");
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