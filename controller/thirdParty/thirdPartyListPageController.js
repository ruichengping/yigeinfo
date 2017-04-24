/**
 * Created by ruichengping on 2017/4/24.
 */
module.exports=(req,res,next) => {
    res.render("thirdParty/thirdPartyList",{
        'activePage':"第三方信息库",
        'activeNavItem':2
    });
};