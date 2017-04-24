/**
 * Created by ruichengping on 2017/4/24.
 */
module.exports=(req,res,next) => {
    res.result.activePage='新增第三方';
    res.result.activeNavItem=2;
    res.render("thirdParty/addthirdParty",res.result);
};