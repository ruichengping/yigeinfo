/**
 * Created by ruichengping on 2017/3/12.
 */
module.exports=class Job{
    constructor(jobName,companyId,hrId,provinceId,
                cityId,countryId,createTime,address,
                experience,education,salary,jobNature,briefIntroduction,description){
        this.jobName=jobName;
        this.companyId=companyId;
        this.hrId=hrId;
        this.provinceId=provinceId;
        this.cityId=cityId;
        this.countryId=countryId;
        this.createTime=createTime;
        this.address=address;
        this.experience=experience;
        this.education=education;
        this.salary=salary;
        this.jobNature=jobNature;
        this.briefIntroduction=briefIntroduction;
        this.description=description;
    }
};