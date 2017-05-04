/**
 * Created by ruichengping on 2017/3/17.
 */
const Company=require("../../orm/Company");
const financingStageList=require('../../common/financingStageList');
const industryFieldList=require('../../common/industryFieldList');
const employeeNumList=require('../../common/employeeNumList');
const provinceList=require('../../common/provinceList');
const getCityListByProvinceId=require('../../tool/getCityListByProvinceId');
const getCountryListByCityId=require('../../tool/getCountryListByCityId');
module.exports=(req,res,next) => {
    var result={};
    result.financingStageList=financingStageList;
    result.industryFieldList=industryFieldList;
    result.employeeNumList=employeeNumList;
    result.provinceList=provinceList;
    if(req.query.companyId){
        let companyId=req.query.companyId;
        Company.findOne({
            where:{
                id:companyId
            }
        }).then(function (mysqlResult) {
            res.result.company=mysqlResult.dataValues;
            res.result.provinceList=provinceList;
            res.result.cityList=getCityListByProvinceId(mysqlResult.provinceId);
            res.result.countryList=getCountryListByCityId(mysqlResult.cityId);
            res.result.financingStageList=financingStageList;
            res.result.industryFieldList=industryFieldList;
            res.result.employeeNumList=employeeNumList;
            res.render('company/companyDetail',res.result);
        }).catch(function (err) {
            console.log(err);
            res.send('该企业不存在');
        });
    }else{
        res.send('参数不合法');
    }

};