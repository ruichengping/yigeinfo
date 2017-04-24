/**
 * Created by ruichengping on 2017/3/12.
 */
const workExperienceList=require('../../common/workExperienceList');
const educationList=require('../../common/educationList');
const salaryLevelList=require('../../common/salaryLevelList');
const jobNatureList=require('../../common/jobNatureList');
module.exports=(req,res,next) => {
    res.result.activePage='职位信息库';
    res.result.activeNavItem=1;
    res.result.workExperienceList=workExperienceList;
    res.result.educationList=educationList;
    res.result.salaryLevelList=salaryLevelList;
    res.result.jobNatureList=jobNatureList;
    res.render("job/jobList",res.result);
};