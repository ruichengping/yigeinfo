/**
 * Created by ruichengping on 2017/3/12.
 */
layui.use(['form', 'layedit','element'],function () {
    var form=layui.form();
    var layedit = layui.layedit;
    //创建一个编辑器
    var editIndex = layedit.build('description');
    //获取省份数据
    $.ajax({
        type:"get",
        url:"/yige/getProvince.json"
    }).done(function (data) {
        if(data.success){
            var provinceHtmlArray=data.provinceList.map(function (provinceItem) {
                return "<option value='"+provinceItem.ProID+"'>"+provinceItem.name+"</option>";
            });
            provinceHtmlArray.unshift("<option value=''>请选择省</option>");
            $("select[name=provinceId]").html(provinceHtmlArray.join(""));
            form.render();
        }
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
                cityId:data.value
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
    //监听提交按钮
    form.on('submit(addJob)', function(){
        $.ajax({
            type:"post",
            url:"/job/addJob.json",
            data:$(".form-addJob").serialize()
        }).done(function (data) {
            if(data.success){
                layer.confirm('新增成功', {
                    title:"信息",
                    icon:1,
                    btn: ['查看','继续添加'] //按钮
                }, function(){
                    window.location.href="/job/jobDetail.html?jobId="+data.job.jobId;
                }, function(index){
                    layer.close(index);
                    window.location.reload();
                });
            }else{
                layer.alert("新增失败",{
                    title:"信息",
                    icon:2,
                });
            }
        });
    });
});
