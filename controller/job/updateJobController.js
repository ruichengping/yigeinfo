/**
 * Created by ruichengping on 2017/3/20.
 */
const Job=require("../../model/job/jobModel");
const getCurrentTime=require("../../tool/getCurrentTime");
const updateJob=require("../../service/job/updateJob");
module.exports=(req,res,next) => {
    let jobId=req.body.jobId;
    let jobName=req.body.jobName;
    let companyId=req.body.companyId;
    let hrId=req.body.hrId;
    let provinceId=req.body.provinceId
    let cityId=req.body.cityId;
    let countryId=req.body.countryId;
    let createTime=getCurrentTime();
    let address=req.body.address;
    let experience=req.body.experience;
    let education=req.body.education;
    let salary=req.body.salary;
    let jobNature=req.body.jobNature;
    let briefIntroduction=req.body.briefIntroduction;
    let description=req.body.description;
    let job=new Job(jobName,companyId,hrId,provinceId,cityId,
        countryId,createTime,address,experience,education,
        salary,jobNature,briefIntroduction,description);
    delete job.hrId;
    updateJob(job,jobId,(result)=> {
        if(result){
            res.send({
                "success":true,
            });
        }else{
            res.send({
                "success":false,
            });
        }

    });
};