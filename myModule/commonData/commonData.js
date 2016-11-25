/**
 * Created by rcp1 on 2016/11/6.
 */
//性别
var sex=[
    {
        id:0,
        name:"不限"
    },
    {
        id:1,
        name:"男"
    },
    {
        id:2,
        name:"女"
    }
];
function getSexById(id) {
    for(var i=0;i<sex.length;i++){
        if(sex[i].id==id){
            return sex[i].name;
        }
    }
}
//有无测试
var isTest=[
    {
        id:0,
        name:"不限"
    },
    {
        id:1,
        name:"有"
    },
    {
        id:2,
        name:"无"
    }
];
function getisTestById(id) {
    for (var i=0;i<isTest.length;i++){
        if(isTest[i].id==id){
            return isTest[i].name;
        }
    }
}
//划分薪资水平
var salary=[
    {
        id:0,
        name:"不限"
    },
    {
        id:1,
        name:"2k以下"
    },
    {
        id:2,
        name:"2k-5k"
    },
    {
        id:3,
        name:"5k-10k"
    },
    {
        id:4,
        name:"10k-15k"
    },
    {
        id:5,
        name:"15k-25k"
    },
    {
        id:6,
        name:"25k-50k"
    },
    {
        id:7,
        name:"50k以上"
    }
];
function getSalaryNameById(id) {
    for(var i=0;i<salary.length;i++){
        if(salary[i].id==id){
            return salary[i].name;
        }
    }
}
//行业领域
var industryField=[
    {
        id:0,
        name:"不限"
    },
    {
        id:1,
        name:"电子商务"
    },
    {
        id:2,
        name:"金融"
    },
    {
        id:3,
        name:"企业服务"
    },
    {
        id:4,
        name:"教育"
    },
    {
        id:5,
        name:"文化娱乐"
    },
    {
        id:6,
        name:"游戏"
    },
    {
        id:7,
        name:"O2O"
    },
    {
        id:8,
        name:"硬件"
    },
    {
        id:9,
        name:"社交网络"
    },
    {
        id:10,
        name:"旅游"
    },
    {
        id:11,
        name:"医疗健康"
    },
    {
        id:12,
        name:"生活服务"
    },
    {
        id:13,
        name:"信息安全"
    },
    {
        id:14,
        name:"数据服务"
    },
    {
        id:15,
        name:"广告营销"
    },
    {
        id:16,
        name:"分类信息"
    },
    {
        id:17,
        name:"招牌"
    },
    {
        id:18,
        name:"移动互联网"
    }
];
function getIndustryFieldById(id) {
    for(var i=0;i<industryField.length;i++){
        if(industryField[i].id==id){
            return industryField[i].name;
        }
    }
}
function getIndustryFieldByArray(array) {
    var reResult=[];
    for(var i=0;i<array.length;i++){
        reResult.push(getIndustryFieldById(array[i]));
    }
    return reResult
}
//融资阶段划分
var financingStage=[
    {
        id:0,
        levelName:"不限"
    },
    {
        id:1,
        levelName: "未融资"
    },
    {
        id:2,
        levelName:"天使"
    },
    {
        id:3,
        levelName:"A轮"
    },
    {
        id:4,
        levelName:"B轮"
    },
    {
        id:5,
        levelName:"C轮"
    },
    {
        id:6,
        levelName:"D轮及以上"
    },
    {
        id:7,
        levelName:"上市公司"
    },
    {
        id:8,
        levelName:"不需要融资"
    }
];
function getFinancingStageById(id) {
    for(var i=0;i<financingStage.length;i++){
        if(financingStage[i].id==id){
            return financingStage[i].levelName;
        }
    }
}
//工作经验
var jobExperience=[
    {
        id:0,
        name:"不限"
    },
    {
        id:1,
        name:"应届毕业生"
    },
    {
        id:2,
        name:"1-3年"
    },
    {
        id:3,
        name:"3-5年"
    },
    {
        id:4,
        name:"5-10年"
    },
    {
        id:5,
        name:"10年以上"
    }
];
function getJobExperienceById(id) {
    for(var i=0;i<jobExperience.length;i++){
        if(jobExperience[i].id==id){
            return jobExperience[i].name;
        }
    }
}
//学历
var educationBackground=[
    {
        id:0,
        name:"不限"
    },
    {
        id:1,
        name:"高中"
    },
    {
        id:2,
        name:"大专"
    },
    {
        id:3,
        name:"本科"
    },
    {
        id:4,
        name:"研究生"
    },
    {
        id:5,
        name:"硕士"
    },
    {
        id:6,
        name:"博士"
    }
];
function getEducationBackgroundById(id) {
    for(var i=0;i<educationBackground.length;i++){
        if(educationBackground[i].id==id){
            return educationBackground[i].name;
        }
    }
}
//工作性质
var jobNature=[
    {
        id:0,
        name:"不限"
    },
    {
        id:1,
        name:"全职"
    },
    {
        id:2,
        name:"兼职"
    },
    {
        id:3,
        name:"实习"
    }
];
function getJobNatureById(id) {
    for(var i=0;i<jobNature.length;i++){
        if(jobNature[i].id==id){
            return jobNature[i].name;
        }
    }
}
//公司员工人数
var employeeNum=[
    {
        id:0,
        name:"不限"
    },
    {
        id:1,
        name:"少于15人"
    },
    {
        id:2,
        nam3:"15~50人"
    },
    {
        id:3,
        name:"50~150人"
    },
    {
        id:4,
        name:"150~500人"
    },
    {
        id:5,
        name:"500~2000人"
    }
];
function getEmployeeNumById(id) {
    for(var i=0;i<employeeNum.length;i++){
        if(employeeNum[i].id==id){
            return employeeNum[i].name;
        }
    }
}
module.exports.sex=sex;
module.exports.getSexById=getSexById;
module.exports.isTest=isTest;
module.exports.getisTestById=getisTestById;
module.exports.getisTestById=getisTestById;
module.exports.salary=salary;
module.exports.getSalaryNameById=getSalaryNameById;
module.exports.industryField=industryField;
module.exports.getIndustryFieldById=getIndustryFieldById;
module.exports.getIndustryFieldByArray=getIndustryFieldByArray;
module.exports.financingStage=financingStage;
module.exports.getFinancingStageById=getFinancingStageById;
module.exports.jobExperience=jobExperience;
module.exports.getJobExperienceById=getJobExperienceById;
module.exports.educationBackground=educationBackground;
module.exports.getEducationBackgroundById=getEducationBackgroundById;
module.exports.jobNature=jobNature;
module.exports.getJobNatureById=getJobNatureById;
module.exports.employeeNum=employeeNum;
module.exports.getEmployeeNumById=getEmployeeNumById;