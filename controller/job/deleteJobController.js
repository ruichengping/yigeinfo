/**
 * Created by ruichengping on 2017/4/23.
 */
const Job=require('../../orm/Job');
const logger=require("../../config/log4js.config");
module.exports=(req,res,next) => {
    Job.update({
        status:0
    },{
        where:{
            id:req.body.jobId
        }
    }).then((result)=>{
        logger.info(`企业${req.body.jobId}删除成功`);
        res.send({
            success:true
        });
    }).catch((err)=>{
        logger.error(err);
        res.send({
            success:false
        });
    });
};