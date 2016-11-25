/**
 * Created by rcp1 on 2016/11/15.
 */
function JobSimpleInfo(logoImage,jobId,jobName,createTime,companyId,
                       companyName,salary,jobExperience,eduactionBackgroud,industryField,
                       currentLevel,jobTemptation,jobNature,cityId,cityName,districtId,districtName) {
    this.logoImage=logoImage;
    this.jobId=jobId;
    this.jobName=jobName;
    this.createTime=createTime;
    this.companyId=companyId;
    this.companyName=companyName;
    this.salary=salary;
    this.jobExperience=jobExperience;
    this.educationBackground=eduactionBackgroud;
    this.industryField=industryField;
    this.currentLevel=currentLevel;
    this.jobTemptation=jobTemptation;
    this.jobNature=jobNature;
    this.cityId=cityId;
    this.cityName=cityName;
    this.districtId=districtId;
    this.districtName=districtName;
}
module.exports.JobSimpleInfo=JobSimpleInfo;