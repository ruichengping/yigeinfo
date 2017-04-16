/**
 * Created by ruichengping on 2017/4/16.
 */
module.exports=(req,res,next) => {
    res.render("resume/resumeList",{
        activePage:"简历信息库"
    });
}