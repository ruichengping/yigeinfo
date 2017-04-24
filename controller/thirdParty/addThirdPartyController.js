/**
 * Created by ruichengping on 2017/4/24.
 */
const ThirdParty=require("../../orm/ThirdParty");
const getCurrentTime=require("../../tool/getCurrentTime");
module.exports=(req,res,next) => {
    ThirdParty.create({
        thirdPartyName:req.body.thirdPartyName,
        type:req.body.type,
        provinceId:req.body.provinceId,
        cityId:req.body.cityId,
        countryId:req.body.countryId,
        createTime:getCurrentTime(),
        address:req.body.address,
        homeUrl:req.body.homeUrl,
        status:1
    }).then((mysqlThirdParty)=>{
        res.send({
            success:true,
            thirdParty:mysqlThirdParty.dataValues
        });
    }).catch((err)=>{
        console.log(err);
        res.send({
            message:'系统异常',
            success:false
        })
    });
};