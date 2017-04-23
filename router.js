/**
 * Created by ruichengping on 2017/3/11.
 */
const express=require("express");
const router=express.Router();
/**
 * 中间件
 */
const verify=require("./middleware/verify");
/**
 *常用控制器
 */
//登录控制器
const loginController=require("./controller/common/loginController");
//获取省份控制器
const provinceController=require("./controller/common/provinceController");
//获取城市控制器
const cityController=require("./controller/common/cityController");
//获取县区控制器
const countryController=require("./controller/common/countryController");
/**
 * 职位控制器
 */
const jobListController=require("./controller/job/jobListController");
const addJobPageController=require("./controller/job/addJobPageController");
const addJobController=require("./controller/job/addJobController");
const jobDetailController=require('./controller/job/jobDetailController');
const updateJobController=require('./controller/job/updateJobController');
const getJobByFilterController=require('./controller/job/getJobByFilterController');
const deleteJobController=require('./controller/job/deleteJobController');
/**
 * 企业控制器
 */
const addCompanyPageController=require("./controller/company/addCompanyPageController");
const companyListPageController=require("./controller/company/companyListPageController");
const addCompanyController=require('./controller/company/addCompanyController');
const companyDetailController=require('./controller/company/companyDetailController');
const updateCompanyController=require('./controller/company/updateCompanyController');
const getCompanyByFilterController=require('./controller/company/getCompanyByFilterController');
const deleteCompanyController=require('./controller/company/deleteCompanyController');
/**
 * 简历控制器
 */
const resumeListPageController=require('./controller/resume/resumeListPageController');
const addResumePageController=require('./controller/resume/addResumePageController');
/**
 * 日常管理
 */
const complaintManagePageController=require('./controller/dailyManage/complaintManage/complaintManagePageController');
/*-----------------------------------------------------------------------------------*/
router.get("/",verify,function (req,res,next) {
    res.redirect("/login.html")
});
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
/**
 * 职位
 */
router.get("/job/jobList.html",verify,jobListController);
router.get("/job/addJob.html",verify,addJobPageController);
router.get("/job/jobDetail.html",verify,jobDetailController);
router.post("/job/addJob.json",addJobController);
router.post('/job/updateJob.json',updateJobController);
router.post('/job/getJob.json',getJobByFilterController);
router.post('/job/deleteJob.json',deleteJobController);
/**
 * 企业
 */
router.get("/company/companyList.html",verify,companyListPageController);
router.get("/company/addCompany.html",verify,addCompanyPageController);
router.get("/company/companyDetail.html",verify,companyDetailController);
router.post("/company/addCompany.json",addCompanyController);
router.post("/company/updateCompany.json",updateCompanyController);
router.post("/company/getCompany.json",getCompanyByFilterController);
router.post("/company/deleteCompany.json",deleteCompanyController);
/**
 * 简历
 */
router.get("/resume/resumeList.html",verify,resumeListPageController);
router.get("/resume/addResume.html",verify,addResumePageController);
/**
 * 日常管理
 */
router.get('/dailyManage/complaintManagePage.html',complaintManagePageController);
/**
 * 常用接口
 */
router.get("/yige/getProvince.json",provinceController);
router.get("/yige/getCityListByProvinceId.json",cityController);
router.get("/yige/getCountryListByCityId.json",countryController);
module.exports=router;