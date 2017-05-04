/**
 * Created by ruichengping on 2017/4/25.
 */
const ThirdParty=require("../../orm/ThirdParty");
const logger=require("../../config/log4js.config");
module.exports=(req,res,next) => {
    ThirdParty.update({
        status:0
    },{
        where:{
            id:req.body.thirdPartyId
        }
    }).then((result)=>{
        logger.info(`企业${req.body.thirdPartyId}删除成功`);
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