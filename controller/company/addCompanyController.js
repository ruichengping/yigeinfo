/**
 * Created by ruichengping on 2017/3/15.
 */
const Company=require("../../orm/Company");
const getCurrentTime=require("../../tool/getCurrentTime");
module.exports=(req,res,next) => {
    Company.create({
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
        createTime:getCurrentTime()
    }).then((mysqlCompany)=>{
        res.send({
           success:true,
           company:mysqlCompany.dataValues
        });
    }).catch((err)=>{
        console.log(err);
        res.send({
           success:false
        });
    });
};