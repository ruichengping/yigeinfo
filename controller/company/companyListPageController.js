/**
 * Created by ruichengping on 2017/3/13.
 */
const financingStageList=require('../../common/financingStageList');
const industryFieldList=require('../../common/industryFieldList');
module.exports=(req,res,next) => {
    res.result.activePage='企业信息库';
    res.result.activeNavItem=1;
    res.result.financingStageList=financingStageList;
    res.result.industryFieldList=industryFieldList;
    res.render("company/companyList",res.result);
};