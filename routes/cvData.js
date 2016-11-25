/**
 * Created by rcp1 on 2016/10/1.
 */
var express=require("express");
var router=express.Router();
//获取城市数据模块
var cityData=require("../myModule/mysqlConn/getOtherInfo");
//获取简历信息模块
var cvDataConnect=require("../myModule/mysqlConn/getCvDataInfo");
//获取同步控制模块
var stepControler=require("../myModule/CommonTools/Step");
//获取简历基本信息模型
var dataModel=require("../myModule/DataModel/cvDataSimpleModel");
//获取常用数据模块
var commonData=require("../myModule/commonData/commonData");
//获取获取其他信息模块
var otherInfo=require("../myModule/mysqlConn/getOtherInfo");
//获取常用工具模块
var commonTool=require("../myModule/CommonTools/commonTool");
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
               otherInfo.getCityName(result[entire[0]].residence,function (cityName) {
                   flag.step(cityName);
               });
           },function (info,entire) {
               cvDataInfo.push(new dataModel.cvDataSimpleModel(
                   result[entire[0]].id,
                   result[entire[0]].photo,
                   result[entire[0]].name,
                   commonTool.getAgeByBirth(result[entire[0]].birthday),
                   result[entire[0]].sex,
                   entire[1],
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
    res.render("cvData",{
        "cityDatas":cityDatas,
        "cvDataInfo":cvDataInfo
    });
});
module.exports=router;