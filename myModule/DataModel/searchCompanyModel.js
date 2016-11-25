/**
 * Created by rcp1 on 2016/11/22.
 */
function SearchCompanyModel(
    searchText,
    cityId,
    districtId,
    currentLevel,
    industryField
) {
    this.searchText=searchText;
    this.cityId=cityId;
    this.districtId=districtId;
    this.currentLevel=currentLevel;
    this.industryField=industryField;
}
module.exports.SearchCompanyModel=SearchCompanyModel;