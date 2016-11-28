/**
 * Created by rcp1 on 2016/11/22.
 */
$("#searchBtn").on("click",function () {
    var cityId=$("#cities i").attr("cityId");
    var districtId=0;
    if(cityId!=0) {
        districtId=$("#district span").filter(".active").attr("districtId");
    }
    var searchText=$("#searchText").val();
   var currentLevel=$("#currentLevel span").filter(".active").attr("level");
   var industryField=$("#industryField span").filter(".active").attr("level");
   $.ajax({
      type:"POST",
       url:"/company/getSearchJobs",
       data:{
           searchText:searchText,
           cityId:cityId,
           districtId:districtId,
           currentLevel:currentLevel,
           industryField:industryField
       }
   }).done(function (data) {
       if(data.success==true){
            $("#companyFromFilter ul").html("");
            var str="";
            var array=data.result;
            for(var i=0;i<array.length;i++){
                str+="<li class='companyItem'>"
                        +"<img class='companyLogo' src='"+array[i].logoImage+"'/>"
                        +"<div class='topItem'>"
                        +"<a href='#'>"+array[i].name+"</a>"
                        +"<span class='logo-company1'>"+array[i].industryField+"</span>"
                        +"<span class='logo-company2'>"+array[i].cityName+"</span>"
                        +"<span class='logo-company3'>"+array[i].currentLevel+"</span>"
                        +"</div>"
                        +"<div class='middleItem'>"
                        +"<strong><span>"+array[i].interviewCount+"</span>条面试评价</strong>"
                        +"<strong><span>"+array[i].jobs+"</span>个在招职位</strong>"
                        +"<strong><span>"+(array[i].handleCount/array[i].resumeCount).toFixed(2)*100+"%</span>简历处理率</strong>"
                        +"</div>"
                        +"<div class='bottomItem'>"
                        +array[i].introduction
                        +"</div>"
                        +"</li>";
            }
            $("#companyFromFilter").html("<ul>"+str+"</ul>");
       }else{
           $("#companyFromFilter").html("<p style='text-align: center;'>"+data.msg+"</p>");
       }
   }).fail(function () {
       alert("连接服务失败！")
   });
});