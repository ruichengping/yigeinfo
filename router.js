/**
 * Created by ruichengping on 2017/3/11.
 */
const express=require("express");
const router=express.Router();
//验证模块
const verify=require("./middleware/verify");
//登录控制器
const loginController=require("./controller/loginController");
//获取省份控制器
const provinceController=require("./controller/provinceController");
//获取城市控制器
const cityController=require("./controller/cityController");
//获取县区控制器
const countryController=require("./controller/countryController");
//职位
const jobListController=require("./controller/jobListController");
const addJobPageController=require("./controller/addJobPageController");
const addJobController=require("./controller/addJobController");
//登录
router.get("/login.html",function (req,res,next) {
    res.render("login",{});
});
//登录验证接口
router.post("/yige/login.json",loginController);
//首页
router.get("/home.html",verify,function (req,res,next) {
    res.render("home/home",{
        activePage:"首页"
    });
});
//职位信息库
router.get("/jobList.html",verify,jobListController);
router.get("/addJob.html",verify,addJobPageController);
router.post("/yige/addJob.json",addJobController);
//企业信息库
router.get("/companyList.html",verify,function (req,res,next) {
    res.render("company/companyList",{
        activePage:"企业信息库"
    });
});
//简历信息库
router.get("/resumeList.html",verify,function (req,res,next) {
    res.render("resume/resumeList",{
        activePage:"简历信息库"
    });
});
//第三方信息库
router.get("/thirdPartyList.html",verify,function (req,res,next) {
    res.render("thirdParty/thirdPartyList",{
        activePage:"第三方信息库"
    });
});

//----------常用省市县三级数据查询----------
router.get("/yige/getProvince.json",provinceController);
router.get("/yige/getCityListByProvinceId.json",cityController);
router.get("/yige/getCountryListByCityId.json",countryController);
module.exports=router;