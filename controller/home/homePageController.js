/**
 * Created by ruichengping on 2017/4/25.
 */
module.exports=(req,res,next)=>{
    res.result.activePage='首页';
    res.result.activeNavItem=0;
    res.render("home/home", res.result);
};