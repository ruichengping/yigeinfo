/**
 * Created by ruichengping on 2017/3/12.
 */
module.exports=(req,res,next) => {
    res.render("job/addJob",{
        activePage:"新增职位"
    });
};