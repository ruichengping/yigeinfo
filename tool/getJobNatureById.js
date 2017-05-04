/**
 * Created by ruichengping on 2017/4/22.
 */
const jobNatureList=require("../common/jobNatureList");
module.exports=(jobNatureId) => {
    let jobNature={};
    jobNatureList.forEach((jobNatureItem) => {
        if(jobNatureItem.ProID==jobNatureId){
            jobNature=jobNatureItem;
        }
    });
    return jobNature;
};