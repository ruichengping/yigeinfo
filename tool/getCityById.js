/**
 * Created by ruichengping on 2017/3/19.
 */
const cityList=require("../common/cityList");
module.exports=(cityId) => {
    let city={};
    cityList.forEach((cityItem) => {
        if(cityItem.CityID==cityId){
            city=cityItem;
        }
    });
    return city;
};