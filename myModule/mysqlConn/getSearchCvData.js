/**
 * Created by rcp1 on 2016/11/26.
 */
var mysqlConfig=require("./mysqlconfig");
var stepControl=require("../CommonTools/Step");
var otherInfo=require("./getOtherInfo");
var dataModel=require("../DataModel/cvDataSimpleModel");
var commonData=require("../commonData/commonData");
var commonTool=require("../CommonTools/commonTool");
var pool=mysqlConfig.pool;
function getSearchCvData(SearchCvDataModel,callback) {
    var sqlStr=[];
    for(attr in SearchCvDataModel){
        if(attr=="searchText"){
            if(SearchCvDataModel[attr]!=""){
                sqlStr.push("name like '%"+SearchCvDataModel[attr]+"%'");
            }else{
                delete SearchCvDataModel[attr];
            }
        }else{
            if(SearchCvDataModel[attr]==0){
                delete SearchCvDataModel[attr];
            }else{
                sqlStr.push(attr+"='"+SearchCvDataModel[attr]+"'");
            }
        }
    }
    pool.getConnection(function (err,conn) {
       if(err){
           console.log("POOL ==> " + err);
       }else{
           conn.query("SELECT * FROM cvdata_basicinfo WHERE "+sqlStr.join(" AND "),function (err,cvDataInfo) {
               if(err){
                    throw  err;
               }else{
                   var cvDataArray=[];
                   if(cvDataInfo.length==0){
                       callback(cvDataInfo);
                   }
                   for(var i=0;i<cvDataInfo.length;i++){
                       stepControl.Step(function () {
                           this.step(i);
                       },function (info,entire) {
                           var flag=this;
                           otherInfo.getCityName(cvDataInfo[entire[0]].cityId,function (cityName) {
                               console.log(cityName);
                               flag.step(cityName);
                           });
                       },function (info,entire) {
                           var flag=this;
                           otherInfo.getDistrictName(cvDataInfo[entire[0]].districtId,function (districtName) {
                               console.log(districtName);
                               flag.step(districtName);
                           })
                       },function (info,entire) {
                           cvDataArray.push(
                               new dataModel.cvDataSimpleModel(
                                   cvDataInfo[entire[0]].id,
                                   cvDataInfo[entire[0]].photo,
                                   cvDataInfo[entire[0]].name,
                                   commonTool.getAgeByBirth(cvDataInfo[entire[0]].birthday),
                                   cvDataInfo[entire[0]].sex,
                                   entire[1]+"/"+entire[2],
                                   commonData.getEducationBackgroundById(cvDataInfo[entire[0]].educationLevel),
                                   commonData.getJobExperienceById(cvDataInfo[entire[0]].jobExperience),
                                   commonData.getisTestById(cvDataInfo[entire[0]].isTest),
                                   cvDataInfo[entire[0]].salary,
                                   cvDataInfo[entire[0]].jobIntension,
                                   cvDataInfo[entire[0]].introduction
                               )
                           );
                           if(cvDataArray.length==cvDataInfo.length){
                               callback(cvDataArray);
                               conn.release();
                           }
                       });
                   }
               }
           });
       }
    });
}
module.exports.getSearchCvData=getSearchCvData;