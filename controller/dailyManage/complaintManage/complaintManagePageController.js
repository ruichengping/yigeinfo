/**
 * Created by ruichengping on 2017/4/23.
 */
module.exports=(req,res,next) => {
    res.result.activePage='投诉管理';
    res.result.activeNavItem=3;
    res.render("dailyManage/complaintManage",res.result);
};