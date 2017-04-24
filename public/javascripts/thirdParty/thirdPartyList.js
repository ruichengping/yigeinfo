/**
 * Created by rcp1 on 2016/11/23.
 */
layui.use(['form', 'laydate','element','laypage'],function () {
    var form = layui.form();
    //数据初始化
    getThirdPartyListData(function (totalCount) {
        //分页
        layui.laypage({
            cont: 'page-wrapper'
            ,pages: Math.ceil(totalCount/10) //总页数
            ,groups: 5 //连续显示分页数
            ,skip:"true"
            ,jump:function (obj) {
                $('input[name=pageNo]').val(obj.curr);
                $('#search').click();
            }
        });
    });
    //删除按钮
    $(document).on("click",".delete",function () {
        var thirdPartyId=$(this).attr("thirdPartyId");
        layer.confirm("是否确定删除该企业",{
            title:"提示",
            icon:"3"
        },function () {
            $.ajax({
                type:'post',
                url:'/thirdParty/deleteThirdParty.json',
                data:{
                    thirdPartyId:thirdPartyId
                }
            }).done(function (data) {
                if(data.success){
                    layer.alert('删除成功', {
                        title:"信息",
                        icon:1,
                    }, function(){
                        window.location.reload();
                    });
                }else{
                    layer.alert('删除失败', {
                        title:"信息",
                        icon:1,
                    }, function(index){
                        layer.close(index);
                    });
                }
            }).fail(function (err) {
                alert('err'+JSON.stringify(err));
            });
        });
    });
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
    //搜索功能
    $('#search').on('click',getThirdPartyListData);
    function getThirdPartyListData(callback) {
        $.ajax({
            type:'post',
            url:"/thirdParty/getThirdParty.json",
            data:$(".filter-thirdParty").serialize()
        }).done(function (data) {
            var html='';
            if(data.success){
                data.thirdPartyList.forEach(function (thirdPartyItem) {
                    html+='<tr>'
                        +'<td>'+thirdPartyItem.id+'</td>'
                        +'<td>'+thirdPartyItem.thirdPartyName+'</td>'
                        +'<td>'+thirdPartyItem.typeName+'</td>'
                        +'<td>'+thirdPartyItem.provinceName+'/'+thirdPartyItem.cityName+'/'+thirdPartyItem.countryName+'</td>'
                        +'<td>'+thirdPartyItem.address+'</td>'
                        +'<td>'+thirdPartyItem.createTime+'</td>'
                        +'<td>'+thirdPartyItem.homeUrl+'</td>'
                        +"<td><a title='删除' thirdPartyId='"+thirdPartyItem.id+"' class='delete' href='javascript:;'><i class='layui-icon'>&#xe640;</i></a></td>"
                        +'</tr>';
                });
                if(html===''){
                    html="<tr><td colspan='9' style='text-align: center'>暂无数据</td></tr>"
                }
                $("#thirdPartyList tbody").html(html);
                if( typeof callback ==='function'){
                    callback(data.totalCount);
                }
            }
        });
    }
});
