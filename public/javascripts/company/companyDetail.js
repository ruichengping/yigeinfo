/**
 * Created by ruichengping on 2017/3/17.
 */
layui.use(['form','layedit'],function () {
    var form=layui.form();
    var layedit = layui.layedit;
    //公司介绍
    var introductionHtmlStr=$(".introductionHtmlStr").val();
    $(".introduction").html(introductionHtmlStr);
    $("#introduction-edit").val(introductionHtmlStr);
    //监听编辑按钮
    $("#basicInfo-btn-edit").on("click",function () {
        layer.msg('切换成编辑模式',{time:1000});
        $("select").removeAttr("disabled");
        $("input[type=text]").removeAttr("readonly");
        $(".introduction").hide();
        $("#introduction-edit").show();
        layedit.build("introduction-edit");
        $(".basic-info-btn-wrapper").show();
        form.render();
    });
    //监听取消按钮
    $(document).on("click",'#basicInfo-btn-cancel',function () {
        layer.msg('切换成普通模式',{time:1000});
        $("select").attr("disabled","disabled");
        $("input[type=text]").attr("readonly","readonly");
        $(".introduction").show();
        $("#introduction-edit").hide();
        $(".layui-layedit").remove();
        $(".basic-info-btn-wrapper").hide();
        form.render();
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
    form.on('submit(basicInfo-submit)',function () {
        $.ajax({
            type:"post",
            url:"/company/editCompany.json",
            data:$("#form-basic-info").serialize()
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
});
