/**
 * Created by ruichengping on 2017/4/24.
 */
const Message=require('../../../orm/Message');
const logger=require("../../../config/log4js.config");
const getCurrentTime=require('../../../tool/getCurrentTime');
module.exports=(req,res,next) => {
    let result={};
    Message.update({
        remark:req.body.remark,
        status:req.body.status,
        handleTime:getCurrentTime()
    },{
        where:{
            $and:[
                {
                    id:{
                        $eq:req.body.messageId
                    }
                }
            ]
        }
    }).then((resulut)=>{
        logger.info('编号'+req.body.messageId+'消息审核成功');
        result.success=true;
        res.send(result);
    }).catch((err)=>{
        logger.error(err);
        result.false=true;
        res.send(result);
    });
};