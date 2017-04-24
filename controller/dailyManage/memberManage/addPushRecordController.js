/**
 * Created by ruichengping on 2017/4/24.
 */
const PushRecord=require('../../../orm/PushRecord');
const logger=require("../../../config/log4js.config");
const getCurrentTime=require("../../../tool/getCurrentTime");
module.exports=(req,res,next) => {
    let result={};
    PushRecord.create({
        companyId:req.body.companyId,
        companyName:req.body.companyName,
        pushType:req.body.pushType,
        createTime:getCurrentTime(),
        content:req.body.content
    }).then((mysqlResult)=>{
        logger.info('推送记录成功');
        result.success=true;
        res.send(result);
    }).catch((err)=>{
        logger.error(err);
        result.false=true;
        res.send(result);
    });
};