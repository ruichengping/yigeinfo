/**
 * Created by ruichengping on 2017/3/13.
 */
module.exports=(req,res,next) => {
    res.render("company/companyList",{
        activePage:"企业信息库"
    });
};