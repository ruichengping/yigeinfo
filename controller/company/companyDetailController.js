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
            result.company=mysqlResult.dataValues;
            result.cityList=getCityListByProvinceId(mysqlResult.provinceId);
            result.countryList=getCountryListByCityId(mysqlResult.cityId);
            res.render('company/companyDetail',result);
        }).catch(function (err) {
            console.log(err);
            res.send('该企业不存在');
        });
    }else{
        res.send('参数不合法');
    }

};