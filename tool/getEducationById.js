/**
 * Created by ruichengping on 2017/3/20.
 */
const educationList=require('../common/educationList');
module.exports=(educationId) => {
    let education={};
    educationList.forEach((educationItem) => {
        if(educationItem.id==educationId){
            education=educationItem;
        }
    });
    return employeeNum;
};