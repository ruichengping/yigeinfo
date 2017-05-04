/**
 * Created by rcp1 on 2016/11/18.
 */
layui.use(['form', 'laydate','element','laypage'],function () {
    //数据初始化
    getJobListData(function (totalCount) {
        layui.laypage({
            cont: 'page-wrapper'
            ,pages: Math.ceil(totalCount/10) //总页数
            ,groups: 5 //连续显示分页数
            ,skip:"true"
            ,jump:function (obj) {
                $('input[name=pageNo]').val(obj.curr);
                $("#search").click();
            }
        });
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
            provinceHtmlArray.unshift("<option value=''>不限</option>");
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
                cityHtmlArray.unshift("<option value=''>不限</option>");
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
                countryHtmlArray.unshift("<option value=''>不限</option>");
                $("select[name=countryId]").html(countryHtmlArray.join(""));
                form.render();
            }
        });
    });
    //删除按钮
    $(document).on("click",".delete",function () {
        var jobId=$(this).attr("jobId");
        layer.confirm("是否确定删除该职位",{
            title:"提示",
            icon:"3"
        },function () {
            $.ajax({
                type:'post',
                url:'/job/deleteJob.json',
                data:{
                    jobId:jobId
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
//搜索按钮
    $("#search").on("click",getJobListData);
    function getJobListData(callback) {
        $.ajax({
            type:'post',
            url:'/job/getJob.json',
            data:$("#jobFilter").serialize()
        }).done(function (data) {
            var html='';
            if(data.success){
                data.jobList.forEach(function (jobItem) {
                    html+='<tr>'
                        +'<td>'+jobItem.id+'</td>'
                        +'<td>'+jobItem.jobName+'</td>'
                        +'<td>'+jobItem.provinceName+'/'+jobItem.cityName+'/'+jobItem.countryName+'</td>'
                        +'<td>'+jobItem.createTime+'</td>'
                        +'<td>'+jobItem.salaryName+'</td>'
                        +'<td>'+jobItem.experienceName+'</td>'
                        +'<td>'+jobItem.educationName+'</td>'
                        +"<td><a title='查看详情' target='_blank' href='/job/jobDetail.html?jobId="+jobItem.id+"'><i class='layui-icon'>&#xe63c;</i></a> <a title='删除' jobId='"+jobItem.id+"' class='delete' href='javascript:;'><i class='layui-icon'>&#xe640;</i></a></td>"
                        +'</tr>';
                });
                if(html===''){
                    html="<tr><td colspan='8' style='text-align: center'>暂无数据</td></tr>"
                }
                $("#jobList tbody").html(html);
                if( typeof callback ==='function'){
                    callback(data.totalCount);
                }
            }
        });
    }
});
