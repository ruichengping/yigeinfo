/**
 * Created by ruichengping on 2017/3/13.
 */
module.exports=(req,res,next) => {
    res.render("company/addCompany",{
        activePage:"新增企业"
    });
};