/**
 * Created by user on 16/10/13.
 */
const express=require("express");
const url=require("url");
const path=require("path");
const router=express.Router();
const jobDetail=require("../myModule/mysqlConn/getJobDetail");
const otherInfo=require("../myModule/mysqlConn/getOtherInfo");
const commonTool=require("../myModule/CommonTools/commonTool");
const step=require("../myModule/CommonTools/Step");
const commonData=require("../myModule/commonData/commonData");
var id;
var jobData={};
router.get("/:id"+".html",function (req,res) {
   id=req.url.substring(1,5);
   step.Step(function () {
      var that=this;
      jobDetail.getJobDetail(id,function (result) {
         step.Step(function () {
            var obj=this;
            jobData.jobId=result[0].jobId;
            jobData.jobName=result[0].jobName;
            jobData.companyId=result[0].companyId;
            jobData.time=commonTool.showDate(result[0].time);
            jobData.jobDescription=result[0].jobDescription.split("\n");
            jobData.jobTemptation=result[0].jobTemptation;
            jobData.handlingRate=Math.round(result[0].handlingCount/result[0].count*100)+"%";
            jobData.handlingDays=result[0].handlingDays;
            jobData.countToday=result[0].countToday;
            jobData.count=result[0].count;
            jobData.jobNatureId=result[0].jobNature;
            jobData.salaryId=result[0].money;
            jobData.educationId=result[0].educationBackground;
            jobData.jobExperienceId=result[0].jobExperience;
            jobData.cityId=result[0].cityId;
            jobData.districtId=result[0].districtId;
            jobData.hrId=result[0].hrId;
            obj.step();
         },function () {
            var obj=this;
            otherInfo.getCompanyName(jobData.companyId,function (name) {
               jobData.companyName=name;
            });
            jobData.jobNatureName=commonData.getJobNatureById(jobData.jobNatureId);
            jobData.salary=commonData.getSalaryNameById(jobData.salaryId);
            jobData.education=commonData.getEducationBackgroundById(jobData.educationId);
            jobData.jobExperience=commonData.getJobExperienceById(jobData.jobExperienceId);
            otherInfo.getCityName(jobData.cityId,function (cityName) {
               jobData.cityName=cityName;
            });
            otherInfo.getDistrictName(jobData.districtId,function (districtName) {
               jobData.districtName=districtName;
            });
            otherInfo.getHrName(jobData.hrId,function (hrName) {
               jobData.hrName=hrName;
            });
            otherInfo.getEvaluationInfo(jobData.jobId,function (evaluationInfo) {
               jobData.evaluationInfo=evaluationInfo;
               obj.step();
            });
         },function () {
            otherInfo.getCompanyInfo(jobData.companyId,function (result) {
               var company=result;
               jobData.homepage=company.homePage;
               jobData.logoImage=company.logoImage;
               jobData.employeeNum=commonData.getEmployeeNumById(company.employeeNum);
               jobData.industryField=commonData.getIndustryFieldByArray(company.industryField);
               jobData.currentLevel=commonData.getFinancingStageById(company.currentLevel);
               that.step();
            });
         });
      });
   },function () {
      res.render("JobDetail",{
         "jobData":jobData
      });
   });
});
module.exports=router;