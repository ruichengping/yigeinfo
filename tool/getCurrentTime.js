/**
 * Created by ruichengping on 2017/3/12.
 */
const toTwo=(num)=> {
    if(num<10){
        return `0${num}`;
    }else{
        return num;
    }
}
module.exports=() => {
    let date=new Date;
    let year=date.getFullYear();
    let month=date.getMonth()+1;
    let day=date.getDate();
    let hour=toTwo(date.getHours());
    let minute=toTwo(date.getMinutes());
    let second=toTwo(date.getSeconds());

    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}