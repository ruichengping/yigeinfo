/**
 * Created by ruichengping on 2017/3/12.
 */
const workExperienceList=require('../../common/workExperienceList');
const educationList=require('../../common/educationList');
const salaryLevelList=require('../../common/salaryLevelList');
const jobNatureList=require('../../common/jobNatureList');
module.exports=(req,res,next) => {
    res.result.activePage='新增职位';
    res.result.activeNavItem=2;
    res.result.workExperienceList=workExperienceList;
    res.result.educationList=educationList;
    res.result.salaryLevelList=salaryLevelList;
    res.result.jobNatureList=jobNatureList;
    res.render("job/addJob",res.result);
};