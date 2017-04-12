/**
 * Created by ruichengping on 2017/3/20.
 */
const Job=require('../../orm/Job');
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
        let promise_getJobBasicInfoById=new Promise((resolve, reject) => {
            Job.findOne({
                where:{
                    id:jobId
                }
            }).then((job)=>{
                if(job){
                    result.cityList=getCityListByProvinceId(job.get("provinceId"));
                    result.countryList=getCountryListByCityId(job.get("cityId"));
                    result.job=job.dataValues;
                    resolve();
                }else{
                    reject();
                }
            }).catch((err)=>{
                console.log(err);
                reject();
            });
        }).then(()=>{
            res.render("job/jobDetail",result);
        }).catch((err)=>{
            console.log(err);
            res.render("job/jobDetail",result);
        });
    }
};