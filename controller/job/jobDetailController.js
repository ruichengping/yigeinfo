/**
 * Created by ruichengping on 2017/3/20.
 */
const Job=require('../../orm/Job');
const Company=require('../../orm/Company');
const provinceList=require('../../common/provinceList');
const getCityListByProvinceId=require('../../tool/getCityListByProvinceId');
const getCountryListByCityId=require('../../tool/getCountryListByCityId');
const educationList=require('../../common/educationList');
const workExperienceList=require('../../common/workExperienceList');
const salaryLevelList=require('../../common/salaryLevelList');
const jobNatureList=require('../../common/jobNatureList');
module.exports=(req,res,next) => {
    let jobId=req.query.jobId;
    let result={};
    let funArray=[];
    result.provinceList=provinceList;
    result.educationList=educationList;
    result.workExperienceList=workExperienceList;
    result.salaryLevelList=salaryLevelList;
    result.jobNatureList=jobNatureList;
    if(jobId){
        Job.findOne({
            where:{
                id:jobId
            }
        }).then((mysqlJob)=>{
            if(mysqlJob){
                result.cityList=getCityListByProvinceId(mysqlJob.get("provinceId"));
                result.countryList=getCountryListByCityId(mysqlJob.get("cityId"));
                result.job=mysqlJob.dataValues;
                Company.findOne({
                    where:{
                        id:mysqlJob.dataValues.companyId
                    }
                }).then((mysqlCompany)=>{
                    result.company=mysqlCompany.dataValues;
                    res.render("job/jobDetail",result);
                }).catch((err)=>{
                    res.send('系统异常');
                });
            }else{
                res.send('该企业不存在');
            }
        }).catch((err)=>{
            console.log(err);
            res.send('系统异常');
        });
    }else{
        res.send("参数不合法");
    }
};