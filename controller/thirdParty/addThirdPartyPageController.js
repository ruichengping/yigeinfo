/**
 * Created by ruichengping on 2017/4/24.
 */
module.exports=(req,res,next) => {
    res.render("thirdParty/addthirdParty",{
        'activePage':"新增第三方",
        'activeNavItem':2
    });
};