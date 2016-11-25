/**
 * Created by rcp1 on 2016/11/22.
 */
var mysqlConfig=require("./mysqlconfig");
var model=require("../DataModel/searchCompanyModel");
var stepControler=require("../CommonTools/Step");
var otherInfo=require("./getOtherInfo");
var commonData=require("../commonData/commonData");
var commonTool=require("../CommonTools/commonTool");
var pool=mysqlConfig.pool;
function getSearchCompany(searchCompanyModel,callback) {
    var array=[];
    for(var attr in searchCompanyModel){
        if(attr=="searchText"){
            if(searchCompanyModel.searchText==""){
                delete searchCompanyModel[attr];
            }else{
                array.push("name like '%" +searchCompanyModel.searchText+"%'");
            }
        }else if(attr=="industryField"){
            if(searchCompanyModel.industryField==0){
                delete  searchCompanyModel[attr];
            }else{
                array.push("industryField like '%"+searchCompanyModel.industryField+"%'");
            }
        }else{
            if (searchCompanyModel[attr]==0) {
                delete searchCompanyModel[attr];
            } else {
                array.push(attr + "='" + searchCompanyModel[attr] + "'");
            }
        }
    }
    pool.getConnection(function (err,conn) {
        if(err){
            console.log("POOL ==> " + err);
        }else{
           conn.query("SELECT * FROM companyinfo where "+array.join(" AND "),function (err,searchResult) {
              if(err){
                  throw err;
              }else{
                  var indexCount=[];
                  for(var i=0;i<searchResult.length;i++){
                      stepControler.Step(function () {
                          this.step(i);
                      },function (index,entire) {
                          var flag=this;
                          otherInfo.getCityName(searchResult[index].cityId,function (cityName) {
                              flag.step(cityName);
                          })
                      },function (cityName,entire) {
                          var flag=this;
                          otherInfo.getDistrictName(searchResult[entire[0]].districtId,function (districtName) {
                              flag.step(districtName);
                          })
                      },function (districtName,entire) {
                          indexCount.push(entire[0]);
                          searchResult[entire[0]].cityName=entire[1];
                          searchResult[entire[0]].districtName=entire[2];
                          searchResult[entire[0]].industryField=commonData.getIndustryFieldByArray(commonTool.toArray(searchResult[entire[0]].industryField)).join(",");
                          if(indexCount.length==searchResult.length){
                              callback(searchResult);
                              conn.release();
                          }
                      });
                  }
              }
           });
        }
    });
}
// var searchCompany=new model.SearchCompanyModel("",3,34,0,1);
// getSearchCompany(searchCompany,function (result) {
//    console.log(result);
// });
module.exports.getSearchCompany=getSearchCompany;