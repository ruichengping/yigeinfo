/**
 * Created by ruichengping on 2017/3/12.
 */
const country=require("../common/countryList");
module.exports=(cityId) => {
    let countryList=[];
    country.forEach((countryItem) => {
       if(countryItem.CityID==cityId) {
           countryList.push(countryItem);
       }
    });
    return countryList;
}