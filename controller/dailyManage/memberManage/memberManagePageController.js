/**
 * Created by ruichengping on 2017/4/24.
 */
module.exports=(req,res,next) => {
    res.render("dailyManage/memberManage",{
        'activePage':"会员",
        'activeNavItem':3
    });
};