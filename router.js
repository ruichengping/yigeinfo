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
 * 首页
 */
const homePageController=require("./controller/home/homePageController");
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
const jobListController=require("./controller/job/jobListPageController");
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
 * 第三方
 */
const addThirdPartyPageController=require('./controller/thirdParty/addThirdPartyPageController');
const addThirdPartyController=require('./controller/thirdParty/addThirdPartyController');
const thirdPartyListPageController=require('./controller/thirdParty/thirdPartyListPageController');
const getThirdPartyByFilterController=require('./controller/thirdParty/getThirdPartyByFilterController');
const deleteThirdPartyController=require('./controller/thirdParty/deleteThirdPartyController');
/**
 * 日常管理
 */
const complaintManagePageController=require('./controller/dailyManage/complaintManage/complaintManagePageController');
const getComplaintByFilterController=require('./controller/dailyManage/complaintManage/getComplaintByFilterController');
const handleComplaintController=require('./controller/dailyManage/complaintManage/handleComplaintController');

const messageManagePageController=require('./controller/dailyManage/messageManage/messageManagePageController');
const getMessageByFilterController=require('./controller/dailyManage/messageManage/getMessageByFilterController');
const handleMessageController=require('./controller/dailyManage/messageManage/handleMessageController');

const memberManagePageController=require('./controller/dailyManage/memberManage/memberManagePageController');
const getPushRecordController=require('./controller/dailyManage/memberManage/getPushRecordController');
const addPushRecordController=require('./controller/dailyManage/memberManage/addPushRecordController');
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
router.get("/home.html",verify,homePageController);
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
 * 第三方
 */
router.get("/thirdParty/addthirdPartyPage.html",verify,addThirdPartyPageController);
router.get("/thirdParty/thirdPartyList.html",verify,thirdPartyListPageController);
router.post("/thirdParty/deleteThirdParty.json",deleteThirdPartyController);
router.post("/thirdParty/addthirdParty.json",addThirdPartyController);
router.post("/thirdParty/getThirdParty.json",getThirdPartyByFilterController);
/**
 * 日常管理
 */
router.get('/dailyManage/complaintManagePage.html',verify,complaintManagePageController);
router.post('/dailyManage/getComplaint.json',getComplaintByFilterController);
router.post('/dailyManage/handleComplaint.json',handleComplaintController);

router.get('/dailyManage/messageManagePage.html',verify,messageManagePageController);
router.post('/dailyManage/getMessage.json',getMessageByFilterController);
router.post('/dailyManage/handleMessage.json',handleMessageController);

router.get('/dailyManage/memberManagePage.html',verify,memberManagePageController);
router.post('/dailyManage/getPushRecord.json',getPushRecordController);
router.post('/dailyManage/addPushRecord.json',addPushRecordController);

/**
 * 常用接口
 */
router.get("/yige/getProvince.json",provinceController);
router.get("/yige/getCityListByProvinceId.json",cityController);
router.get("/yige/getCountryListByCityId.json",countryController);
module.exports=router;