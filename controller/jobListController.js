/**
 * Created by ruichengping on 2017/3/12.
 */
module.exports=(req,res,next) => {
    res.render("job/jobList",{
        activePage:"职位信息库"
    });
};