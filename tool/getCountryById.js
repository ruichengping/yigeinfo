/**
 * Created by ruichengping on 2017/3/19.
 */
const countryList=require('../common/countryList');
module.exports=(countryId) => {
    let country={};
    countryList.forEach((countryItem) => {
        if(countryItem.Id==countryId){
            country=countryItem;
        }
    });
    return country;
};