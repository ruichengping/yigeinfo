/**
 * Created by rcp1 on 2016/10/1.
 */
const express=require("express");
const router=express.Router();
//获取城市数据模块
const cityData=require("../myModule/mysqlConn/getOtherInfo");
//获取公司信息模块
const companyInfo=require("../myModule/mysqlConn/getCompanyInfo");
//获取常用数据模块
const commonData=require("../myModule/commonData/commonData");
//获取常用工具模块
const commonTool=require("../myModule/CommonTools/commonTool");
//获取其他信息模块
const otherInfo=require("../myModule/mysqlConn/getOtherInfo");
//同步控制工具
const stepController=require("../myModule/CommonTools/Step");
//获取搜索公司信息模块
const searchCompanyInfo=require("../myModule/mysqlConn/getSearchCompanys");
var cityDatas;
var companys;
router.get("/",function (req,res,next) {
    cityData.getCities(function (result) {
        cityDatas=result;
        next();
    });
},function (req,res,next) {
    companyInfo.getAllCompanyInfo(function (result) {
       companys=result;
       next();
    });
},function (req,res,next) {
    var indexList=[];
    for(var i=0;i<companys.length;i++){
        stepController.Step(function () {
          this.step(i);
        },function (result,entire) {
            var flag=this;
            otherInfo.getCityName(companys[entire[0]].cityId,function (cityName) {
                flag.step(cityName);
            });
        },function (result,entire) {
            var flag=this;
            otherInfo.getDistrictName(companys[entire[0]].districtId,function (districtName) {
                flag.step(districtName);
            });
        },function (result,entrie) {
           indexList.push(entrie[0]);
            companys[entrie[0]].currentLevel=commonData.getFinancingStageById(companys[entrie[0]].currentLevel);
            companys[entrie[0]].industryField=commonData.getIndustryFieldByArray(commonTool.toArray(companys[entrie[0]].industryField)).join(",");
            companys[entrie[0]].cityName=entrie[1];
            companys[entrie[0]].districtName=entrie[2];
            if(indexList.length==companys.length){
                next();
            }
        });
    }
},function (req,res) {
    res.render("company",{
        "cityDatas":cityDatas,
        "companys":companys
    });
});
router.post("/getSearchJobs",function (req,res,next) {
    var searchJobModel={
        "searchText":req.body.searchText,
        "cityId":req.body.cityId,
        "districtId":req.body.districtId,
        "currentLevel":req.body.currentLevel,
        "industryField":req.body.industryField
    };
    searchCompanyInfo.getSearchCompany(searchJobModel,function (result) {
        if(result.length==0){
            res.send({
                success:false,
                msg:"没有搜索到您想要的结果！",
                result:result
            });
        }else{
            res.send({
                success:true,
                msg:"",
                result:result
            });
        }

    });
});
module.exports=router;