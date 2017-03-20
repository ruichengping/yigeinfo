/**
 * Created by ruichengping on 2017/3/20.
 */
const workExperienceList=require('../common/workExperienceList');
module.exports=(workExperienceId) => {
    let workExperience={};
    workExperienceList.forEach((workExperienceItem) => {
        if(workExperienceItem.id==workExperienceId){
            workExperience=workExperienceItem;
        }
    });
    return workExperience;
};