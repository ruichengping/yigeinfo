/**
 * Created by ruichengping on 2017/4/23.
 */
const Complaint=require('../../../orm/Complaint');
const moment = require('moment');
const logger=require("../../../config/log4js.config");
module.exports=(req,res,next) => {
    let filter={
        $and:[]
    };
    if(req.body.complaintName!=''){
        filter.$and.push(
            {
                complaintName:{
                    $like:"%"+req.body.complaintName+"%"
                }
            }
        );
    }
    if(req.body.status!=''){
        filter.$and.push(
            {
                status:{
                    $eq:req.body.status
                }
            }
        );
    }
    //返回对象
    let responseObj={};
    let task1=Complaint.findAll({
        limit: [(req.body.pageNo-1)*20,20],
        where:filter
    }).then((mysqlComplaint)=>{
        logger.info("投诉数据获取成功");
        let complaintList=[];
        if(mysqlComplaint.length>0){
            complaintList=mysqlComplaint.map(function (complaintItem) {
                complaintItem.dataValues.createTime=moment(complaintItem.dataValues.createTime).format('YYYY-MM-DD HH:mm');
                return complaintItem.dataValues;
            });
        }
        responseObj.complaintList=complaintList;
    }).catch((error)=>{
        logger.error(error);
    });


    let task2=Complaint.count({
        attributes:['id']
    }).then((count)=>{
        logger.info("投诉数据总数获取成功");
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