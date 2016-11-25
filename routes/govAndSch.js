/**
 * Created by rcp1 on 2016/10/1.
 */
var express=require("express");
var router=express.Router();
var cityData=require("../myModule/mysqlConn/getOtherInfo");
var getGovAndSchInfo=require("../myModule/mysqlConn/getGovAndSchInfo");
var cityDatas=null;
var allGovAndSchInfo=null;
cityData.getCities(function (result) {
    cityDatas=result;
});
getGovAndSchInfo.getAllGovAndSchInfo(function (result) {
   allGovAndSchInfo=result;
});
router.get("/",function (req,res) {
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
    console.log(cityId+","+districtId+","+selectType);
    getGovAndSchInfo.searchThirdParty(text,cityId,districtId,selectType,function (result) {
        var resResult;
        if(result.length==0){
            resResult=new ResResult(false,null,"没有您想要的数据!");
        }else{
            resResult=new ResResult(true,result,"");
        }
        res.send(resResult);
    });
});
module.exports=router;