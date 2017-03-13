/**
 * Created by ruichengping on 2017/3/12.
 */
const provinceList=require("../../common/provinceList");
module.exports=(req,res,next) => {
    res.send({
        "success":true,
        "provinceList":provinceList
    });
};