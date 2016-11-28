/**
 * Created by rcp1 on 2016/11/26.
 */
function SearchCvDataModel(
    searchText,//搜索信息
    cityId,//城市ID
    districtId,//行政区ID
    jobExperience,//工作经验
    educationLevel,//学历
    isTest,//有无测评
    jobIntension//求职意向
) {
    this.searchText=searchText;
    this.cityId=cityId;
    this.districtId=districtId;
    this.jobExperience=jobExperience;
    this.educationLevel=educationLevel;
    this.isTest=isTest;
    this.jobIntension=jobIntension;
}
module.exports.SearchCvDataModel=SearchCvDataModel;