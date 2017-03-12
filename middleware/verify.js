/**
 * Created by ruichengping on 2017/3/12.
 */
module.exports=(req,res,next) => {
    if(req.session.user){
        next();
    }else{
        res.redirect("/login.html");
    }
}