/**
 * Created by ruichengping on 2017/3/19.
 */
const financingStageList=require("../common/financingStageList");
module.exports=(financingStageId) => {
    let financingStage={};
    financingStageList.forEach((financingStageItem) => {
        if(financingStageItem.id==financingStageId){
            financingStage=financingStageItem;
        }
    });
    return financingStage;
};