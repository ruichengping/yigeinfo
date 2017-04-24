/**
 * Created by ruichengping on 2017/4/24.
 */
const PushRecord=require('../../../orm/PushRecord');
const moment = require('moment');
const logger=require("../../../config/log4js.config");
module.exports=(req,res,next) => {
    let filter={
        $and:[]
    };
    let typeObj={
        1:'简历推送',
        2:'消息推送'
    };
    if(req.body.companyName!=''){
        filter.$and.push(
            {
                companyName:{
                    $like:"%"+req.body.companyName+"%"
                }
            }
        );
    }
    //返回对象
    let responseObj={};
    let task1=PushRecord.findAll({
        limit: [(req.body.pageNo-1)*20,20],
        where:filter
    }).then((mysqlPushRecord)=>{
        logger.info("消息数据获取成功");
        let pushRecordList=[];
        if(mysqlPushRecord.length>0){
         pushRecordList=mysqlPushRecord.map(function (pushRecordItem) {
             pushRecordItem.dataValues.typeName=typeObj[pushRecordItem.dataValues.pushType];
             pushRecordItem.dataValues.createTime=moment(pushRecordItem.dataValues.createTime).format('YYYY-MM-DD HH:mm');
                return pushRecordItem.dataValues;
            });
        }
        responseObj.pushRecordList=pushRecordList;
    }).catch((error)=>{
        logger.error(error);
    });


    let task2=PushRecord.count({
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