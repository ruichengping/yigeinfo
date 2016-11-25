/**
 * Created by rcp1 on 2016/11/24.
 */
function cvDataSimpleModel(
    id,
    photo,//头像
    name,//姓名
    age,//年龄
    sex,//性别
    residence,//现居住地
    educationLevel,//学历
    jobExperience,//工作经验
    isTest,//是否人才测评
    salary,//期望薪资
    jobIntension,//求职意向
    introduction//一句话简介
) {
    this.id=id;
    this.photo=photo;
    this.name=name;
    this.age=age;
    this.sex=sex;
    this.residence=residence;
    this.educationLevel=educationLevel;
    this.jobExperience=jobExperience;
    this.isTest=isTest;
    this.salary=salary;
    this.jobIntension=jobIntension;
    this.introduction=introduction;
}
module.exports.cvDataSimpleModel=cvDataSimpleModel;