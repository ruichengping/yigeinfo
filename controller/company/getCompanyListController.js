/**
 * Created by ruichengping on 2017/3/20.
 */
const getCompanyList=require('../../service/company/getCompanyList');
module.exports=(req,res,next) => {
    let companyName=req.body.companyName;
    getCompanyList(companyName,(companyList) => {
        res.send({
            'success':true,
            'companyList':companyList
        });
    });
};