/**
 * Created by rcp1 on 2016/11/23.
 */
$("#searchBtn").on("click",function () {
   var searchText=$("#searchText").val();
   var city=$("#cities i").attr("cityId");
    var district=0;
   if(city!=0){
      district=$("#district span").filter(".active").attr("districtId");
   }
   var jobExperience=$("#jobExperience span").filter(".active").attr("level");
   var educationLevel=$("#educationLevel span").filter(".active").attr("level");
   var isTest=$("#isTest span").filter(".active").attr("level");
   var jobIntension=$("#jobIntension span").filter(".active").attr("level");
   $.ajax({
      type:"POST",
       url:"/cvData/searchCvData.json",
       data:{
          searchText:searchText,
           cityId:city,
           districtId:district,
           jobExperience:jobExperience,
           educationLevel:educationLevel,
           isTest:isTest,
           jobIntension:jobIntension
       }
   }).done(function (data) {
       if(data.success){
           var array=data.result;
           var str="";
           for(var i=0;i<array.length;i++){
               var imgSrc;
               var sexName;
               if(array[i].sex==1){
                   imgSrc="/images/boy.png";
                   sexName="男";
               }else{
                   imgSrc="/images/girl.png";
                   sexName="女";
               }
               str+="<li class='cvDataItem'>"
                   +"<img src='"+array[i].photo+"' class='photo'/>"
                   +"<div class='topItem'>"
                   +"<strong class='name'>"+array[i].name+"("+array[i].age+"岁)"
                   +"<img src='"+imgSrc+"' alt='"+sexName+"' class='sex'/>"
                   +"</strong>"
                   +"<span class='logo-city'>"+array[i].residence+"</span>"
                   +"<span class='logo-jobExperienceLogo left-10'>"+array[i].jobExperience+"</span>"
                   +"<span class='logo-education left-10'>"+array[i].educationLevel+"</span>"
                   +"<span class='logo-abilityTest left-10'>"+array[i].isTest+"</span>"
                   + "</div>"
                   +"<div class='middleItem'>"
                   +"<strong class='salary'>"+array[i].salary+"</strong>"
                   +"<strong>求职岗位：</strong>"
                   +"<span>"+array[i].jobIntension+"</span>"
                   + "</div>"
                   +"<div class='bottomItem'>"
                   +array[i].introduction
                   + "</div>"
                   +"</li>"
           }
           $("#jobFromFilter").html("<ul>"+str+"</ul>");
       }else{
           $("#jobFromFilter").html("<p style='text-align: center;'>"+data.msg+"</p>");
       }
   }).fail(function () {
       alert("服务器连接失败!");
   });
});