/**
 * Created by ruichengping on 2017/3/12.
 */
module.exports=class JobFilter{
    constructor(pageNo,length,jobName,provinceId,
                cityId,countryId,experience,education,
                startDate,endDate,financingStage,industryField,salary,jobNature){
        this.pageNo=pageNo;
        this.length=length;
        this.jobName=jobName;
        this.provinceId=provinceId;
        this.cityId=cityId;
        this.countryId=countryId;
        this.experience=experience;
        this.education=education;
        this.startDate=startDate;
        this.endDate=endDate;
        this.financingStage=financingStage;
        this.industryField=industryField;
        this.salary=salary;
        this.jobNature=jobNature;
    }
}
