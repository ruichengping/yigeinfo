/**
 * Created by ruichengping on 2017/4/24.
 */
const Message=require('../../../orm/Message');
const moment = require('moment');
const logger=require("../../../config/log4js.config");
module.exports=(req,res,next) => {
    let filter={
        $and:[]
    };
    let statusName={
        0:'待处理',
        1:'通过',
        2:'不通过'
    }
    let statusObj={
        $eq:0
    };
    if(req.body.status>0){
        statusObj={
            $gte: 1
        };
    }
    if(req.body.promulgatorName!=''){
        filter.$and.push(
            {
                promulgatorName:{
                    $like:"%"+req.body.promulgatorName+"%"
                }
            }
        );
    }
    if(req.body.status!=''){
        filter.$and.push(
            {
                status:statusObj
            }
        );
    }
    //返回对象
    let responseObj={};
    let task1=Message.findAll({
        limit: [(req.body.pageNo-1)*20,20],
        where:filter
    }).then((mysqlMessage)=>{
        logger.info("消息数据获取成功");
        let messageList=[];
        if(mysqlMessage.length>0){
            messageList=mysqlMessage.map(function (messageItem) {
                if(!messageItem.dataValues.remark){
                    messageItem.dataValues.remark='';
                }
                if(messageItem.dataValues.handleTime){
                    messageItem.dataValues.handleTime=moment(messageItem.dataValues.handleTime).format('YYYY-MM-DD HH:mm');
                }
                messageItem.dataValues.statusName=statusName[messageItem.dataValues.status];
                messageItem.dataValues.createTime=moment(messageItem.dataValues.createTime).format('YYYY-MM-DD HH:mm');
                return messageItem.dataValues;
            });
        }
        responseObj.messageList=messageList;
    }).catch((error)=>{
        logger.error(error);
    });


    let task2=Message.count({
        attributes:['id']
    }).then((count)=>{
        logger.info("消息数据总数获取成功");
        responseObj.totalCount=count;
    }).catch((error)=>{
        logger.error(error);
    });

    Promise.all([task1,task2]).then(()=>{
        responseObj.success=true;
        res.send(responseObj);
    }).catch((error)=>{
        logger.error(error);
        responseObj.success=false;
        res.send(responseObj);
    });
};