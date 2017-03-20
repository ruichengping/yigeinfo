/**
 * Created by user on 16/10/17.
 */
var monthEnum={
    Jan:1,
    Feb:2,
    Mar:3,
    Apr:4,
    May:5,
    Jun:6,
    Jul:7,
    Aug:8,
    Sep:9,
    Oct:10,
    Nov:11,
    Dec:12
}
//发布时间计算
function showDate(dateTime) {
    dateTime+="";
    var today=new Date();
    var array=dateTime.split(" ");
    if(monthEnum[array[1]]<today.getMonth()+1){
       return array[3]+"-"+toTwo(monthEnum[array[1]])+"-"+array[2];
    }else{
        if(array[2]<today.getDate()){
            return array[3]+"-"+toTwo(monthEnum[array[1]])+"-"+array[2];
        }else{
            var time=array[4].split(":");
            time.pop();
            return time.join(":");
        }
    }

}
//转换成YYYY-MM-DD
function toDate(date) {
    var str=date+"";
    var array=str.split(" ");
    return array[3]+"-"+monthEnum[array[1]]+"-"+array[2];
}
//一位转成两位
function toTwo(num) {
    if(num>9){
        return num;
    }else{
        return "0"+num;
    }
}
//字符串转数组
function toArray(str) {
    return str.split(",");

}
//字符串中是否含有某个字符
function isHas(text,str) {
    var array=toArray(str);
    var isHasFlag=false;
    for(i=0;i<array.length;i++){
        if(array[i]==text){
            isHasFlag=true;
        }
    }
    return isHasFlag;
}
//根据生日得到年龄
function getAgeByBirth(birth) {
    var date=toDate(birth);
    var array=date.split("-");
    var todayDate=new Date();
    var year=todayDate.getFullYear();
    var month=todayDate.getMonth()+1;
    var day=todayDate.getDate();
    if(array[1]<month||(array[1]==month&&array[2]<=day)){
        return year-array[0];
    }else{
        return year-1-array[0];
    }
}
module.exports.showDate=showDate;
module.exports.toArray=toArray;
module.exports.isHas=isHas;
module.exports.getAgeByBirth=getAgeByBirth;