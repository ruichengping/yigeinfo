/**
 * Created by user on 16/10/12.
 */
var express=require("express");
var cityData=require("../myModule/mysqlConn/getOtherInfo");
var router=express.Router();
router.post("/",function (req,res) {
    cityData.getDistricts(req.body.cityId,function (result) {
        res.send(result);
    });
});
module.exports=router;
