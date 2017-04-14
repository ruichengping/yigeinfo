/**
 * Created by ruichengping on 2017/3/20.
 */
const Job=require("../../orm/Job");
const getCurrentTime=require("../../tool/getCurrentTime");
module.exports=(req,res,next) => {
    Job.update({
        jobName:req.body.jobName,
        companyId:req.body.companyId,
        provinceId:req.body.provinceId,
        cityId:req.body.cityId,
        countryId:req.body.countryId,
        modificateTime:getCurrentTime(),
        address:req.body.address,
        experience:req.body.experience,
        education:req.body.education,
        salary:req.body.salary,
        jobNature:req.body.jobNature,
        briefIntroduction:req.body.briefIntroduction,
        description:req.body.description
    },{
        where:{
            id:req.body.jobId
        }
    }).then((mysqlJob) => {
        res.send({
            success:true
        });
    }).catch((err) => {
        console.log(err);
        res.send({
           success:false
        });
    });
};