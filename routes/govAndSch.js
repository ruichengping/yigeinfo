/**
 * Created by rcp1 on 2016/10/1.
 */
const express=require("express");
const router=express.Router();
//获取城市数据模块
const cityData=require("../myModule/mysqlConn/getOtherInfo");
//获取第三信息模块
const getGovAndSchInfo=require("../myModule/mysqlConn/getGovAndSchInfo");
//获取第三方简易信息模型
const dataSimppleModel=require("../myModule/DataModel/thirdPartySimpleModel");
var cityDatas=null;
var allGovAndSchInfo=null;


router.get("/",function (req,res,next) {
    cityData.getCities(function (result) {
        cityDatas=result;
        next();
    });
},function (req,res,next) {
    getGovAndSchInfo.getAllGovAndSchInfo(function (result) {
        allGovAndSchInfo=result;
        next();
    });
},function (req,res) {
    res.render("govAndSch",{
        "cityDatas":cityDatas,
        "allGovAndSchInfo":allGovAndSchInfo
    });
});
router.post("/getSearchGovAndSch.json",function (req,res) {
    var text=req.body.searchText;
    var cityId=req.body.cityId;
    var districtId=req.body.districtId;
    var selectType=req.body.selectType;
    function ResResult(success,result,msg){
        this.success=success;
        this.msg=msg;
        this.result=result;
    }
    getGovAndSchInfo.searchThirdParty(text,cityId,districtId,selectType,function (result) {
        var resResult;
        var thirdPartyInfo=[];
        for(var i=0;i<result.length;i++){
            thirdPartyInfo.push(new dataSimppleModel.thirdPartySimpleModel(
                result[i].id,
                result[i].name,
                result[i].type,
                result[i].address,
                result[i].telephone,
                result[i].reTrends,
                result[i].noTrends
            ));
        }
        if(result.length==0){
            resResult=new ResResult(false,null,"没有您想要的数据!");
        }else{
            resResult=new ResResult(true,thirdPartyInfo,"");
        }
        res.send(resResult);
    });
});
module.exports=router;