/**
 * Created by ruichengping on 2017/3/12.
 */
const getCityListByProvinceId=require("../tool/getCityListByProvinceId");
module.exports=(req,res,next) => {
    let provinceId= req.query.provinceId;
    res.send({
        "success":true,
        "cityList":getCityListByProvinceId(provinceId)
    });
};