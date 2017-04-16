/**
 * Created by ruichengping on 2017/4/16.
 */
module.exports=(req,res,next) => {
    res.render("resume/addResume",{
        activePage:"新增简历"
    });
}