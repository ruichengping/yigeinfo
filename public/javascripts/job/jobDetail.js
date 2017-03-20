/**
 * Created by ruichengping on 2017/3/20.
 */
layui.use(['form','layedit'],function () {
    var form=layui.form();
    var layedit = layui.layedit;
    //职位描述
    var jobDescriptionHtmlStr=$("input[name=jobDescriptionHtmlStr]").val();
    $(".jobDescriptionHtml").html(jobDescriptionHtmlStr);
    $("#description-edit").val(jobDescriptionHtmlStr);
    //监听编辑按钮
    $("#basicInfo-btn-edit").on("click",function () {
        layer.msg('切换成编辑模式',{time:1000});
        $("select").removeAttr("disabled");
        $("input[type=text]").removeAttr("readonly");
        $(".jobDescriptionHtml").hide();
        $("#description-edit").show();
        layedit.build("description-edit");
        $(".basic-info-btn-wrapper").show();
        form.render();
    });
    //监听取消按钮
    $(document).on("click",'#job-basicInfo-btn-cancel',function () {
        layer.msg('切换成普通模式',{time:1000});
        $("select").attr("disabled","disabled");
        $("input[type=text]").attr("readonly","readonly");
        $(".jobDescriptionHtml").show();
        $("#description-edit").hide();
        $(".layui-layedit").remove();
        $(".basic-info-btn-wrapper").hide();
        form.render();
    });
    form.on('submit(job-basicInfo-submit)',function () {
        $.ajax({
            type:"post",
            url:"/job/updateJob.json",
            data:$("#form-job-basicInfo").serialize()
        }).done(function (data) {
            if(data.success){
                layer.msg("保存成功",{time:1000});
                setTimeout(function () {
                    window.location.reload();
                },1000);
            }else{
                layer.msg("保存失败",{time:1000});
            }
        });
    });
//省份改变获取城市
    form.on('select(province)', function(data){
        $.ajax({
            type:"get",
            url:"/yige/getCityListByProvinceId.json",
            data:{
                provinceId:data.value
            }
        }).done(function (data) {
            if(data.success){
                var cityHtmlArray=data.cityList.map(function (cityItem) {
                    return "<option value='"+cityItem.CityID+"'>"+cityItem.name+"</option>";
                });
                cityHtmlArray.unshift("<option value=''>请选择城市</option>");
                $("select[name=cityId]").html(cityHtmlArray.join(""));
                form.render();
            }
        });
    });
    //城市改变获取县区
    form.on('select(city)', function(data){
        $.ajax({
            type:"get",
            url:"/yige/getCountryListByCityId.json",
            data:{
                countryId:data.value
            }
        }).done(function (data) {
            if(data.success){
                var countryHtmlArray=data.countryList.map(function (countryItem) {
                    return "<option value='"+countryItem.Id+"'>"+countryItem.DisName+"</option>";
                });
                countryHtmlArray.unshift("<option value=''>请选择县/区</option>");
                $("select[name=countryId]").html(countryHtmlArray.join(""));
                form.render();
            }
        });
    });
});