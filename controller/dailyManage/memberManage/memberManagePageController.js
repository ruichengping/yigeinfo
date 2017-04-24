/**
 * Created by ruichengping on 2017/4/24.
 */
module.exports=(req,res,next) => {
    res.result.activePage='会员管理';
    res.result.activeNavItem=3;
    res.render("dailyManage/memberManage",res.result);
};