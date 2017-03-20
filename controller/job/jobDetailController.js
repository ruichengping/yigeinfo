/**
 * Created by ruichengping on 2017/3/20.
 */
const getJobBasicInfoById=require('../../service/job/getJobBasicInfoById');
const getCompanyList=require('../../service/company/getCompanyList');
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

    if(jobId){
        let promise_getJobBasicInfoById=new Promise((resolve, reject) => {
            getJobBasicInfoById(jobId,(result) => {
                let basicInfo=result;
                basicInfo.provinceList=provinceList;
                basicInfo.cityList=getCityListByProvinceId(basicInfo.provinceId);
                basicInfo.countryList=getCountryListByCityId(basicInfo.cityId);
                basicInfo.educationList=educationList;
                basicInfo.workExperienceList=workExperienceList;
                basicInfo.salaryLevelList=salaryLevelList;
                basicInfo.jobNatureList=jobNatureList;
                resolve(basicInfo);
            });
        }).then((basicInfo)=>{
            result.basicInfo=basicInfo;
        });
        funArray.push(promise_getJobBasicInfoById);

        let promise_getCompanyList=new Promise((resolve, reject) => {
            getCompanyList('',(companyList) => {
                resolve(companyList);
            });
        }).then((companyList)=>{
            result.companyList=companyList;
        });
        funArray.push(promise_getCompanyList);


        Promise.all(funArray).then((dill) => {
            res.render("job/jobDetail",result);
        });
    }
};