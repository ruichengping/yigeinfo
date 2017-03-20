/**
 * Created by ruichengping on 2017/3/19.
 */
const employeeNumList=require('../common/employeeNumList');
module.exports=(enployeeNumId) => {
    let employeeNum={};
    employeeNumList.forEach((employeeNumItem) => {
        if(employeeNumItem.id==enployeeNumId){
            employeeNum=employeeNumItem;
        }
    });
    return employeeNum;
};