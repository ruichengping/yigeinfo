/**
 * Created by ruichengping on 2017/4/24.
 */
layui.use(['form','element','laypage','layer'], function(){
    var form = layui.form();
    var layer=layui.layer;
    var element = layui.element();
    element.on('tab(memberTab)', function(elem){
        $('input[name=type]').val(elem.index);
        $("#search").click();
    });
    //数据初始化
    getMemberListData(function (totalCount) {
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
    //完成处理按钮
    $(document).on('click','.memberPush',function () {
        var innerHtml=$("#memberHandleHtml").html();
        layer.open({
            type: 1,
            area: ['500px', '300px'],
            content: innerHtml //这里content是一个普通的String
        });
        $("input[name=companyId]").val($(this).attr('companyId'));
        $("input[name=companyName]").val($(this).attr('companyName'));
        form.render();
    });
    $(document).on('click','.btn-memberPush-post',function () {
        $.ajax({
            type:'post',
            url:'/dailyManage/addPushRecord.json',
            data:$("#member-handle-form").serialize()
        }).done(function (data) {
            if(data.success){
                layer.alert('推送成功', {
                    title:"信息",
                    icon:1,
                }, function(){
                    window.location.reload();
                });
            }
        });
    });
    //查询按钮
    $("#search").on('click',function () {
        if($('input[name=type]').val()==0){
            getMemberListData();
        }else{
            getMemberPushRecordList();
        }
    });
    function getMemberListData(callback) {
        $.ajax({
            type:'post',
            url:'/company/getCompany.json',
            data:$("#member-filter").serialize()
        }).done(function (data) {
            var html='';
            if(data.success){
                data.companyList.forEach(function (companyItem) {
                    html+='<tr>'
                        +'<td>'+companyItem.id+'</td>'
                        +'<td>'+companyItem.companyName+'</td>'
                        +'<td>'+companyItem.memberEndTime+'</td>'
                        +'<td>'+companyItem.recentTime+'</td>'
                        +"<td><button companyId='"+companyItem.id+"'companyName='"+companyItem.companyName+"' type='button' class='layui-btn layui-btn-small layui-btn-normal memberPush'>推送</button></td>"
                        +'</tr>';
                });
                if(html===''){
                    html="<tr><td colspan='5' style='text-align: center'>暂无数据</td></tr>"
                }
                $("#member-table tbody").html(html);
                if( typeof callback ==='function'){
                    callback(data.totalCount);
                }
            }
        });
    }
    function getMemberPushRecordList(callback) {
        $.ajax({
            type:'post',
            url:'/dailyManage/getPushRecord.json',
            data:$("#member-filter").serialize()
        }).done(function (data) {
            var html='';
            if(data.success){
                data.pushRecordList.forEach(function (pushRecordItem) {
                    html+='<tr>'
                        +'<td>'+pushRecordItem.id+'</td>'
                        +'<td>'+pushRecordItem.companyName+'</td>'
                        +'<td>'+pushRecordItem.createTime+'</td>'
                        +'<td>'+pushRecordItem.typeName+'</td>'
                        +'<td>'+pushRecordItem.content+'</td>'
                        +'</tr>';
                });
                if(html===''){
                    html="<tr><td colspan='5' style='text-align: center'>暂无数据</td></tr>"
                }
                $("#pushRecord-table tbody").html(html);
                if( typeof callback ==='function'){
                    callback(data.totalCount);
                }
            }
        });
    }
});