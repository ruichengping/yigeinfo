/**
 * Created by ruichengping on 2017/3/13.
 */
module.exports=(req,res,next) => {
    res.result.activePage='新增企业';
    res.result.activeNavItem=2;
    res.render("company/addCompany",res.result);
};