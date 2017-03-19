/**
 * Created by ruichengping on 2017/3/17.
 */
const getCompanyBasicInfoById=require('../../service/company/getCompanyBasicInfoById');
const financingStageList=require('../../common/financingStageList');
const industryFieldList=require('../../common/industryFieldList');
const employeeNumList=require('../../common/employeeNumList');
const provinceList=require('../../common/provinceList');
const getCityListByProvinceId=require('../../tool/getCityListByProvinceId');
const getCountryListByCityId=require('../../tool/getCountryListByCityId');
module.exports=(req,res,next) => {
    if(req.query.companyId){
        let companyId=req.query.companyId;
        new Promise((resolve, reject) => {
            getCompanyBasicInfoById(companyId,(result) => {
                let basicInfo=result;
                basicInfo.financingStageList=financingStageList;
                basicInfo.industryFieldList=industryFieldList;
                basicInfo.employeeNumList=employeeNumList;
                basicInfo.provinceList=provinceList;
                basicInfo.cityList=getCityListByProvinceId(basicInfo.provinceId);
                basicInfo.countryList=getCountryListByCityId(basicInfo.cityId);
                resolve(basicInfo);
            });
        }).then((basicInfo) => {
            res.render('company/companyDetail',{
                'basicInfo':basicInfo
            });
        });
    }else{
        res.send('该企业不存在');
    }

};