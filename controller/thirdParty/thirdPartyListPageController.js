/**
 * Created by ruichengping on 2017/4/24.
 */
module.exports=(req,res,next) => {
    res.result.activePage='第三方信息库';
    res.result.activeNavItem=1;
    res.render("thirdParty/thirdPartyList",res.result);
};