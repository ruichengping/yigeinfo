/**
 * Created by ruichengping on 2017/3/19.
 */
const industryFieldList=require('../common/industryFieldList');
module.exports=(industryFieldId) => {
    let industryField={};
    industryFieldList.forEach((industryFieldItem) => {
        if(industryFieldId==industryFieldItem.id){
            industryField=industryFieldItem;
        }
    });
    return industryField;
};