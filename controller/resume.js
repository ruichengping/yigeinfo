/**
 * Created by rcp1 on 2016/10/1.
 */
const express=require("express");
const router=express.Router();
//获取城市数据模块
const cityData=require("../myModule/mysqlConn/getOtherInfo");
//获取简历信息模块
const cvDataConnect=require("../myModule/mysqlConn/getCvDataInfo");
//获取同步控制模块
const stepControler=require("../myModule/CommonTools/Step");
//获取简历基本信息模型
const dataModel=require("../myModule/DataModel/cvDataSimpleModel");
//获取常用数据模块
const commonData=require("../myModule/commonData/commonData");
//获取获取其他信息模块
const otherInfo=require("../myModule/mysqlConn/getOtherInfo");
//获取常用工具模块
const commonTool=require("../myModule/CommonTools/commonTool");
//获取搜索简历模型
const searchModel=require("../myModule/DataModel/searchCvDataModel");
//获取搜索简历模块
const searchCvData=require("../myModule/mysqlConn/getSearchCvData");
var cityDatas=null;
var cvDataInfo=[];
router.get("/",function (req,res,next){
    cvDataInfo=[];
    cityData.getCities(function (result) {
        cityDatas=result;
        next();
    });
},function (req,res,next) {
   cvDataConnect.getAllCvData(function (result) {
       for(var i=0;i<result.length;i++){
           stepControler.Step(function () {
               this.step(i);
           },function (info,entire) {
               var flag=this;
               otherInfo.getCityName(result[entire[0]].cityId,function (cityName) {
                   flag.step(cityName);
               });
           },function (info,entire) {
               var flag=this;
               otherInfo.getDistrictName(result[entire[0]].districtId,function (districtName) {
                  flag.step(districtName);
               });
           },function (info,entire) {
               cvDataInfo.push(new dataModel.cvDataSimpleModel(
                   result[entire[0]].id,
                   result[entire[0]].photo,
                   result[entire[0]].name,
                   commonTool.getAgeByBirth(result[entire[0]].birthday),
                   result[entire[0]].sex,
                   entire[1]+"/"+entire[2],
                   commonData.getEducationBackgroundById(result[entire[0]].educationLevel),
                   commonData.getJobExperienceById(result[entire[0]].jobExperience),
                   commonData.getisTestById(result[entire[0]].isTest),
                   result[entire[0]].salary,
                   result[entire[0]].jobIntension,
                   result[entire[0]].introduction
               ));
               if(cvDataInfo.length==result.length){
                     next();
               }
           });
       }
   });

},function (req,res,next) {
    res.render("resume/resume",{
        "activePage":"resumes",
        "cityDatas":cityDatas,
        "cvDataInfo":cvDataInfo
    });
});
router.post("/searchCvData.json",function (req,res) {
    var SearchCvDataModel=new searchModel.SearchCvDataModel(
        req.body.searchText,
        req.body.cityId,
        req.body.districtId,
        req.body.jobExperience,
        req.body.educationLevel,
        req.body.isTest,
        req.body.jobIntension
    );
    searchCvData.getSearchCvData(SearchCvDataModel,function (result) {
        if(result.length==0){
            res.send({
                success:false,
                msg:"没有您想要的数据!",
                result:result
            });
        }else{
            res.send({
                success:true,
                msg:"",
                result:result
            })
        }
    });
});
module.exports=router;