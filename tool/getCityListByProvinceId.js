/**
 * Created by ruichengping on 2017/3/12.
 */
const city=require("../common/cityList");
module.exports=(provinceId) => {
    let cityArray=[];
    city.forEach((cityItem)=> {
        if(cityItem.ProID==provinceId){
            cityArray.push(cityItem);
        }
    });
    return cityArray;
}