/**
 * Created by ruichengping on 2017/4/16.
 */
/**
 * Created by ruichengping on 2017/3/17.
 */
const Company=require("../../orm/Company");
const logger=require("../../config/log4js.config");
module.exports=(req,res,next) => {
    Company.findAll({
        limit: 20,
        where:{
            companyName:{
                $like:req.body.companyName+"%"
            },
            provinceId:req.body.provinceId,
            cityId:req.body.cityId,
            countryId:req.body.countryId,
            financingStage:req.body.financingStage,
            industryField:req.body.industryField,
            createTime:{
                $between: [req.body.startTime, req.body.endTime],
            }
        }
    }).then((mysqlCompany)=>{
        logger.info("企业数据获取成功");
        res.send({
            success:true,
            companyList:mysqlCompany.dataValues,
        })
    }).catch((error)=>{
        logger.error(error);
    });
};