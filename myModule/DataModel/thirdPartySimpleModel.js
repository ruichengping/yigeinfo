/**
 * Created by rcp1 on 2016/11/27.
 */
function thirdPartySimpleModel(
    id,//序号
    name,//名称
    type,//类型
    address,//地址
    telephone,//电话
    reTrends,//已发动态
    noTrends//待审核动态
) {
    this.id=id;
    this.name=name;
    if(type==1){
        this.type="学校";
    }else{
        this.type="政府";
    }
    this.address=address;
    this.telephone=telephone;
    this.reTrends=reTrends;
    this.noTrends=noTrends;
}
module.exports.thirdPartySimpleModel=thirdPartySimpleModel;