/**
 * Created by ruichengping on 2017/3/12.
 */
const workExperienceList=require('../../common/workExperienceList');
const educationList=require('../../common/educationList');
const salaryLevelList=require('../../common/salaryLevelList');
const jobNatureList=require('../../common/jobNatureList');
module.exports=(req,res,next) => {
    res.render("job/jobList",{
        'activePage':"职位信息库",
        'activeNavItem':1,
        'workExperienceList':workExperienceList,
        'educationList':educationList,
        'salaryLevelList':salaryLevelList,
        'jobNatureList':jobNatureList
    });
};