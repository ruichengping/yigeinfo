/**
 * Created by ruichengping on 2017/3/19.
 */
const Company=require("../../model/company/companyModel");
const getCurrentTime=require("../../tool/getCurrentTime");
const updateCompany=require('../../service/company/updateCompany');
module.exports=(req,res,next) => {
    let companyId=req.body.companyId;
    let companyName=req.body.companyName;
    let financingStage=req.body.financingStage;
    let industryField=req.body.industryField;
    let employeeNum=req.body.employeeNum;
    let provinceId=req.body.provinceId;
    let cityId=req.body.cityId;
    let countryId=req.body.countryId;
    let address=req.body.address;
    let companyWord=req.body.companyWord;
    let introduction=req.body.introduction;
    let createTime=getCurrentTime();

    let company=new Company(companyName,financingStage,industryField,employeeNum,provinceId,
        cityId,countryId,address,companyWord,introduction,createTime);
    updateCompany(company,companyId,(result) => {
        if(result){
            res.send({
                "success":true,
            });
        }else{
            res.send({
                "success":false
            })
        }
    });
};