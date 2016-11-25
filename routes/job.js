/**
 * Created by rcp1 on 2016/10/1.
 */
var express=require("express");
var router=express.Router();
var step=require("../myModule/CommonTools/Step");
//获取常用工具模块
var commonTool=require("../myModule/CommonTools/commonTool");
//获取城市数据模块
var otherInfo=require("../myModule/mysqlConn/getOtherInfo");
//获取职位详情模块
var jobDetailModel=require("../myModule/mysqlConn/getJobDetail");
//获取常用固定数据模块
var commonData=require("../myModule/commonData/commonData");
//获取工作简易模型
var JobSimpleModel=require("../myModule/DataModel/jobSimpleModel");
//获取城市数据
var cityData =[];
var jobData=[];
router.get("/", function (req, res, next) {
    otherInfo.getCities(function (result) {
        cityData = result;
        next();
    });
}, function (req, res, next) {
    jobDetailModel.getAllJobDeatil(function (result) {
        for (var i = 0; i < result.length; i++) {
            step.Step(function () {
                this.step(i);
            }, function (info, entrie) {
                var flag = this;
                otherInfo.getCompanyInfo(result[entrie[0]].companyId, function (companyInfo) {
                    flag.step(companyInfo);
                });
            }, function (info, entire) {
                var flag = this;
                otherInfo.getCityName(result[entire[0]].cityId, function (cityName) {
                    flag.step(cityName);
                });
            }, function (info,entire) {
                var flag = this;
                otherInfo.getDistrictName(result[entire[0]].districtId, function (districtName) {
                    flag.step(districtName);
                });
            }, function (info,entire) {
                jobData.push(
                    new JobSimpleModel.JobSimpleInfo(
                        result[entire[0]].logoImage,
                        result[entire[0]].jobId,
                        result[entire[0]].jobName,
                        commonTool.showDate(result[entire[0]].time),
                        result[entire[0]].companyId,
                        entire[1]    .name,
                        commonData.getSalaryNameById(jobDetail[j].money),
                        commonData.getJobExperienceById(jobDetail[j].jobExperience),
                        commonData.getEducationBackgroundById(jobDetail[j].educationBackground),
                        commonData.getIndustryFieldByArray(commonTool.toArray(jobCompany[j].industryField)),
                        commonData.getFinancingStageById(jobCompany[j].currentLevel),
                        jobDetail[j].jobTemptation,
                        commonData.getJobNatureById(jobDetail[j].jobNature),
                        jobCompany[j].cityId,
                        cityName[j],
                        jobCompany[j].districtId,
                        districtName[j])
                );
                if (jobData.length == result.length) {
                    next();
                }
            });
        }
    });
}, function (req, res) {
    res.render("job", {
        "salary": commonData.salary,
        "jobNature": commonData.jobNature,
        "cityDatas": cityData,
        "jobData": jobData
    });
});
var searchJob=require("../myModule/DataModel/searchJobModel");
var getSearchJobInfo=require("../myModule/mysqlConn/getSearchJobInfo");
router.post("/searchJob",function (req,res) {
    var SearchJobModel= new searchJob.SearchJobModel(
        req.body.searchText,
        req.body.cityId,
        req.body.districtId,
        req.body.jobExperience,
        req.body.educationBackground,
        req.body.currentLevel,
        req.body.industryField,
        req.body.money,
        req.body.jobNature
    );
    function ResResult(success,msg,result){
        this.success=success;
        this.msg=msg;
        this.result=result;
    }
    getSearchJobInfo.getSearchJobInfo(SearchJobModel,function (result) {
        console.log(result);
        if(result.length>0){
            res.send(new ResResult(
                true,
                "",
                result
            ));
        }else{
            res.send(new ResResult(
               false,
                "没有您想要的数据!",
                result
            ));
        }

    });
});
module.exports=router;