/**
 * Created by ruichengping on 2017/3/19.
 */
const provinceList=require("../common/provinceList");
module.exports=(provinceId) => {
    let province={};
    provinceList.forEach((provinceItem) => {
       if(provinceItem.ProID==provinceId){
           province=provinceItem;
       }
    });
    return province;
};