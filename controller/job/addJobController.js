/**
 * Created by ruichengping on 2017/3/12.
 */
const Job=require("../../orm/Job");
const getCurrentTime=require("../../tool/getCurrentTime");
module.exports=(req,res,next) => {
    Job.create({
        jobName:req.body.jobName,
        companyId:req.body.companyId,
        hrId:req.body.hrId,
        provinceId:req.body.provinceId,
        cityId:req.body.cityId,
        countryId:req.body.countryId,
        createTime:getCurrentTime(),
        address:req.body.address,
        experience:req.body.experience,
        education:req.body.education,
        salary:req.body.salary,
        jobNature:req.body.jobNature,
        briefIntroduction:req.body.briefIntroduction,
        description:req.body.description,
    }).then((mysqlJob)=>{
        res.send({
           success:true,
            job:mysqlJob.dataValues
        });
    }).catch((err)=>{
        console.log(err);
        res.send({
            message:'系统异常',
            success:false
        })
    });
};