/**
 * Created by ruichengping on 2017/4/22.
 */
const Company=require("../../orm/Company");
const logger=require("../../config/log4js.config");
module.exports=(req,res,next) => {
    Company.update({
        status:0
    },{
        where:{
            id:req.body.companyId
        }
    }).then((result)=>{
        logger.info(`企业${req.body.companyId}删除成功`);
        res.send({
            success:true
        });
    }).catch((err)=>{
       logger.error(err);
        res.send({
            success:false
        });
    });
}