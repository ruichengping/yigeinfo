/**
 * Created by ruichengping on 2017/4/22.
 */
const salaryLevelList=require('../common/salaryLevelList');
module.exports=(salaryLevelId) => {
    let salaryLevel={};
    salaryLevelList.forEach((salaryLevelItem) => {
        if(salaryLevelItem.id==salaryLevelId){
            salaryLevel=salaryLevelItem;
        }
    });
    return salaryLevel;
};