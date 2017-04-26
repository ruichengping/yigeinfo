/**
 * Created by ruichengping on 2017/3/12.
 */
const workExperienceList=require('../../common/workExperienceList');
const educationList=require('../../common/educationList');
const salaryLevelList=require('../../common/salaryLevelList');
const jobNatureList=require('../../common/jobNatureList');
const Company=require('../../orm/Company');
module.exports=(req,res,next) => {
    res.result.activePage='新增职位';
    res.result.activeNavItem=2;
    res.result.workExperienceList=workExperienceList;
    res.result.educationList=educationList;
    res.result.salaryLevelList=salaryLevelList;
    res.result.jobNatureList=jobNatureList;
    Company.findAll({
        attributes:['id','companyName']
    }).then((mysqlCompany)=>{
        let companyList=[];
        if(mysqlCompany.length>0){
            companyList=mysqlCompany.map((companyItem)=>{
                return companyItem.dataValues;
            });
        }
        res.result.companyList=companyList;
        res.render("job/addJob",res.result);
    }).catch((err)=>{
        res.send("企业数据获取出现问题");
    });
};