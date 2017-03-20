/**
 * Created by ruichengping on 2017/3/12.
 */
const getCompanyList=require('../../service/company/getCompanyList');
module.exports=(req,res,next) => {
    new Promise((resolve, reject) => {
        getCompanyList('',(companyList) => {
            resolve(companyList);
        });
    }).then((companyList) =>{
        res.render("job/addJob",{
            'activePage':"新增职位",
            'companyList':companyList
        });
    });
};