/**
 * Created by ruichengping on 2017/4/23.
 */
module.exports=(req,res,next) => {
    res.render("dailyManage/complaintManage",{
        'activePage':"投诉管理",
    });
};