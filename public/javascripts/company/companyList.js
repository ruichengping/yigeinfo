/**
 * Created by rcp1 on 2016/11/22.
 */
//删除按钮
$(document).on("click",".delete",function () {
    layer.confirm("是否确定删除该企业",{
        title:"提示",
        icon:"3"
    },function () {
        layer.msg("删除成功！");
    });
});
//筛选条件控制显隐
$("#btn-slide-controll").on("click",function () {
    if($(".filter-wrapper").hasClass("hide")){
        $(".filter-wrapper").removeClass("hide").addClass("show");
        $(this).find("i").html("&#xe619;");
    }else{
        $(".filter-wrapper").removeClass("show").addClass("hide");
        $(this).find("i").html("&#xe61a;");
    }

});