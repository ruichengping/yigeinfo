/**
 * Created by ruichengping on 2017/4/24.
 */
module.exports=(req,res,next) => {
    res.render("dailyManage/messageManage",{
        'activePage':"消息管理",
        'activeNavItem':3
    });
};