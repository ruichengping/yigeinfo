/**
 * Created by rcp1 on 2016/11/18.
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
//搜索按钮
$("#btn-search").on("click",function () {
});
layui.use(['form', 'laydate','element','laypage'],function () {
    layui.laypage({
        cont: 'page-wrapper'
        ,pages: 100 //总页数
        ,groups: 5 //连续显示分页数
        ,skip:"true"
    });
    var form = layui.form();
    //获取省份数据
    $.ajax({
        type:"get",
        url:"/yige/getProvince.json"
    }).done(function (data) {
        if(data.success){
            var provinceHtmlArray=data.provinceList.map(function (provinceItem) {
                return "<option value='"+provinceItem.ProID+"'>"+provinceItem.name+"</option>";
            });
            provinceHtmlArray.unshift("<option value='0'>不限</option>");
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
                cityHtmlArray.unshift("<option value='0'>不限</option>");
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
                countryHtmlArray.unshift("<option value='0'>不限</option>");
                $("select[name=countryId]").html(countryHtmlArray.join(""));
                form.render();
            }
        });
    });
});
