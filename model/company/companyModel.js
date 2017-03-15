/**
 * Created by ruichengping on 2017/3/15.
 */
module.exports=class Company{
    constructor(companyName,financingStage,industryField,employeeNum,
                provinceId,cityId,countryId,address,companyWord,introduction,createTime){
            this.companyName=companyName;
            this.financingStage=financingStage;
            this.industryField=industryField;
            this.employeeNum=employeeNum;
            this.provinceId=provinceId;
            this.cityId=cityId;
            this.countryId=countryId;
            this.address=address;
            this.companyWord=companyWord;
            this.introduction=introduction;
            this.createTime=createTime;
    }
}