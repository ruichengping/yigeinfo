/**
 * Created by ruichengping on 2017/3/13.
 */
const financingStageList=require('../../common/financingStageList');
const industryFieldList=require('../../common/industryFieldList');
module.exports=(req,res,next) => {
    res.render("company/companyList",{
        "activePage":"企业信息库",
        'activeNavItem':1,
        "financingStageList":financingStageList,
        "industryFieldList":industryFieldList
    });
};