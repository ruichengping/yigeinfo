/**
 * Created by rcp1 on 2016/11/18.
 */
$("#searchBtn").on("click",function () {
    var searchText=$("#searchText").val();
    var cityId=$("#cities i").attr("cityId");
    var districtId;
    var jobExperience=$("#jobExperience span").filter(".active").attr("level");
    var educationBackground=$("#educationBackground span").filter(".active").attr("level");
    var currentLevel=$("#currentLevel span").filter(".active").attr("level");
    var industryField=$("#industry span").filter(".active").attr("level");
    var salaryLevel=$("#salaryLevel").val();
    var jobNature=$("#jobNature").val();
    if(cityId!=0){
         districtId=$("#district span").filter(".active").attr("districtId");
    }else{
        districtId=0;
    }
    var postData={
        searchText:searchText,
        cityId:cityId,
        districtId:districtId,
        jobExperience:jobExperience,
        educationBackground:educationBackground,
        currentLevel:currentLevel,
        industryField:industryField,
        money:salaryLevel,
        jobNature:jobNature
    }
    $.ajax({
       type:"POST",
        url:"/job/searchJob",
        data:postData
    }).done(function (data) {
        console.log(data);
        if(data.success){
            var array=data.result;
            var htmlStr="";
            for(var i=0;i<array.length;i++){
                htmlStr+="<li class='jobItem'>"
                        +"<div class='itemTop'>"
                        +"<input type='hidden' class='jobId' value='"+array[i].jobId+"'/>"
                        +"<input type='hidden' class='cityId' value='"+array[i].cityId+"'/>"
                        +"<input type='hidden' class='districtId' value='"+array[i].districtId+"'/>"
                        +"<a class='jobName' href='/getjobDetail/<%=jobData[i].jobId%>.html' target='_blank'>"+array[i].jobName+"["+array[i].cityName+"/"+array[i].districtName+"]</a>"
                        +"<span class='date'>"+array[i].time+"</span>"
                        +"<input type='hidden' class='companyId' value='array[i].companyId'/>"
                        +"<a class='companyName' href='#'>"+array[i].prototype.name+"</a>"
                        +"</div>"
                        +"<div class='itemMiddle'>"
                        +"<span class='salary'>"+array[i].money+"</span>"
                        +"<span class='learnBackground'>"+array[i].jobExperience+"/"+array[i].educationBackground+"</span>"
                        +"<span class='trade'>"+array[i].prototype.industryField+"/"+array[i].prototype.currentLevel+"</span>"
                        +"</div>"
                        +"<div class='itemBottom'>"
                        +"<span class='drumbeate'>"+array[i].jobTemptation+"</span>"
                        +"<span class='jobNature'>"+array[i].jobNature+"</span>"
                        +"</div>"
                        +"<a class='companyLogo' href='#'>"
                        +"<img  src='"+array[i].prototype.logoImage+"' width='60px' height='60px' />"
                        +"</a>"
                        +"</li>"
            }
            $("#jobFromFilter ul").html(htmlStr);
        }else{
            $("#jobFromFilter").html("<p style='text-align: center'>"+data.msg+"</p>");
        }
    });
});