/**
 * Created by ruichengping on 2017/4/23.
 */
const Complaint=require('../../../orm/Complaint');
const logger=require("../../../config/log4js.config");
const getCurrentTime=require('../../../tool/getCurrentTime');
module.exports=(req,res,next) => {
    let result={};
    Complaint.update({
        handleResult:req.body.handleResult,
        status:1,
        handleTime:getCurrentTime()
    },{
        where:{
            $and:[
                {
                   id:{
                       $eq:req.body.complaintId
                   }
                }
            ]
        }
    }).then((resulut)=>{
        logger.info('编号'+req.body.complaintId+'投诉处理成功');
        result.success=true;
        res.send(result);
    }).catch((err)=>{
        logger.error(err);
        result.false=true;
        res.send(result);
    });
};