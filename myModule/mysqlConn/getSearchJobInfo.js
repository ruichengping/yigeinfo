/**
 * Created by rcp1 on 2016/11/18.
 */
var mysqlConfig=require("./mysqlconfig");
var dataModel=require("../DataModel/searchJobModel");
var commonTool=require("../CommonTools/commonTool");
var commonData=require("../commonData/commonData");
var otherInfo=require("../mysqlConn/getOtherInfo");
var stepControler=require("../CommonTools/Step");
var pool=mysqlConfig.pool;
function getSearchJobInfo(searchJobModel, callback) {
    var str = [];
    for (attr in searchJobModel) {
        if (attr == "searchText") {
            if (searchJobModel[attr] == "") {
                delete  searchJobModel[attr];
            } else {
                str.push("jobName like '%" + searchJobModel[attr] + "%'");
            }
        } else if (attr == "currentLevel"||attr == "industryField") {
            continue;
        }else {
            if (searchJobModel[attr] == "0") {
                delete  searchJobModel[attr];
            } else {
                str.push(attr + "='" + searchJobModel[attr] + "'");
            }
        }

    }
    pool.getConnection(function (err, conn) {
        if (err) {
            console.log("POOL ==> " + err);
        } else {
            conn.query("SELECT * FROM jobs where " + str.join(" AND "), function (err, result) {
                if (err) {
                    throw err;
                } else {
                    var handleCount=[];
                    var jobDetail = [];
                    for (var j = 0; j < result.length; j++) {
                        var index=j;
                        filterByCompany(index,result,jobDetail,searchJobModel,handleCount,callback);
                    }
                }
            });
        }
    });
}
// var searchModel=new dataModel.SearchJobModel("",2,38,0,0,0,0,0,0);
//  // console.log(new dataModel.SearchJobModel("",2,38,0,0,0,0,0,0));
// getSearchJobInfo(searchModel,function (jobs) {
//    console.log(jobs);
// });

function filterByCompany(index,jobs,filterJobArray,searchJobModel,handleCount,callback) {
    otherInfo.getCompanyInfo(jobs[index].companyId, function (companyResult) {
        var isAdd = true;
        if (searchJobModel.currentLevel != 0 && companyResult.currentLevel != searchJobModel.currentLevel) {
             console.log(1);
            isAdd = false;
        }
        if (searchJobModel.industryField != 0 && commonTool.isHas(searchModel.industryField, companyResult.industryField) == false) {
            console.log(2);
            isAdd = false;
        }
        if (isAdd) {
            jobs[index].time=commonTool.showDate(jobs[index].time);
            jobs[index].money = commonData.getSalaryNameById(jobs[index].money);
            jobs[index].jobExperience = commonData.getJobExperienceById(jobs[index].jobExperience);
            jobs[index].educationBackground = commonData.getEducationBackgroundById(jobs[index].educationBackground);
            jobs[index].jobNature = commonData.getJobNatureById(jobs[index].jobNature);
            companyResult.industryField = commonData.getIndustryFieldByArray(commonTool.toArray(companyResult.industryField)).join(",");
            companyResult.currentLevel = commonData.getFinancingStageById(companyResult.currentLevel);
            stepControler.Step(function () {
                var flag=this;
                otherInfo.getCityName(jobs[index].cityId, function (cityName) {
                    jobs[index].cityName = cityName;
                    flag.step();
                });
            },function () {
                var flag=this;
                otherInfo.getDistrictName(jobs[index].districtId, function (districtName) {
                    jobs[index].districtName = districtName;
                    flag.step();
                });
            },function () {
                jobs[index].prototype = companyResult;
                filterJobArray.push(jobs[index]);
                handleCount.push(index);
                if(handleCount.length==jobs.length){
                    callback(filterJobArray);
                }
            });
        }else{
            handleCount.push(index);
            if(handleCount.length==jobs.length){
                callback(filterJobArray);
            }
        }
    });
}
module.exports.getSearchJobInfo=getSearchJobInfo;