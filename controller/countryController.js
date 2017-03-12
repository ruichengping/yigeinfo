/**
 * Created by ruichengping on 2017/3/12.
 */
const getCountListByCityId=require("../tool/getCountryListByCityId");
module.exports=(req,res,next) => {
    let cityId=req.query.countryId;
    res.send({
       "success":true,
        "countryList":getCountListByCityId(cityId)
    });
};