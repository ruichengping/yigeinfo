/**
 * Created by rcp1 on 2016/11/18.
 */
function SearchJobModel(
    searchText,
    cityId,
    districtId,
    jobExperience,
    educationBackground,
    currentLevel,
    industryField,
    money,
    jobNature
) {
    this.searchText=searchText;
    this.cityId=cityId;
    this.districtId=districtId;
    this.jobExperience=jobExperience;
    this.educationBackground=educationBackground;
    this.currentLevel=currentLevel;
    this.industryField=industryField;
    this.money=money;
    this.jobNature=jobNature;
}
module.exports.SearchJobModel=SearchJobModel;