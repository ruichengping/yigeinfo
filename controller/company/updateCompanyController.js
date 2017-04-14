/**
 * Created by ruichengping on 2017/3/19.
 */
const Company=require("../../orm/Company");
const getCurrentTime=require("../../tool/getCurrentTime");
module.exports=(req,res,next) => {
    let result={};
    Company.update({
        companyName:req.body.companyName,
        financingStage:req.body.financingStage,
        industryField:req.body.industryField,
        employeeNum:req.body.employeeNum,
        provinceId:req.body.provinceId,
        cityId:req.body.cityId,
        countryId:req.body.countryId,
        address:req.body.address,
        companyWord:req.body.companyWord,
        introduction:req.body.introduction,
        modificateTime:getCurrentTime()
    },{
        where:{
            id:req.body.companyId
        }
    }).then((mysqlCompany)=>{
        console.log(mysqlCompany);
        result.success=true;
        res.send(result);
    }).catch((err)=>{
        result.success=false;
        console.log(err);
        res.send(result);
    });
};