/**
 * Created by ruichengping on 2017/4/24.
 */
layui.use(['form','element','laypage','layer'], function(){
    var form = layui.form();
    var layer=layui.layer;
    var element = layui.element();
    element.on('tab(messageTab)', function(elem){
        $('input[name=status]').val(elem.index);
        getMessageListData();
    });
    //数据初始化
    getMessageListData(function (totalCount) {
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
    $(document).on('click','.messageHandle',function () {
        var innerHtml=$("#messageHandleHtml").html();
        layer.open({
            type: 1,
            area: ['500px', '300px'],
            content: innerHtml //这里content是一个普通的String
        });
        $("input[name=messageId]").val($(this).attr('messageId'));
        form.render();
    });
    $(document).on('click','.btn-messageHandle-post',function () {
        $.ajax({
            type:'post',
            url:'/dailyManage/handleMessage.json',
            data:$("#message-handle-form").serialize()
        }).done(function (data) {
            if(data.success){
                layer.alert('处理成功', {
                    title:"信息",
                    icon:1,
                }, function(){
                    window.location.reload();
                });
            }
        });
    });
    //查询按钮
    $("#search").on('click',getMessageListData);
    function getMessageListData(callback) {
        $.ajax({
            type:'post',
            url:'/dailyManage/getMessage.json',
            data:$("#message-filter").serialize()
        }).done(function (data) {
            var html='';
            if(data.success){
                var status=$("input[name=status]").val();
                if(status==0){
                    data.messageList.forEach(function (messageItem) {
                        html+='<tr>'
                            +'<td>'+messageItem.id+'</td>'
                            +'<td>'+messageItem.promulgatorName+'</td>'
                            +'<td>'+messageItem.content+'</td>'
                            +'<td>'+messageItem.createTime+'</td>'
                            +'<td>'+messageItem.statusName+'</td>'
                            +"<td style='text-align: center;'><button messageId='"+messageItem.id+"' type='button' class='layui-btn layui-btn-small layui-btn-normal messageHandle'>审核</button></td>"
                            +'</tr>';
                    });
                    if(html===''){
                        html="<tr><td colspan='6' style='text-align: center'>暂无数据</td></tr>"
                    }
                }else{
                    data.messageList.forEach(function (messageItem) {
                        html+='<tr>'
                            +'<td>'+messageItem.id+'</td>'
                            +'<td>'+messageItem.promulgatorName+'</td>'
                            +'<td>'+messageItem.content+'</td>'
                            +'<td>'+messageItem.createTime+'</td>'
                            +'<td>'+messageItem.remark+'</td>'
                            +'<td>'+messageItem.handleTime+'</td>'
                            +'<td>'+messageItem.statusName+'</td>'
                            +'</tr>';
                    });
                    if(html===''){
                        html="<tr><td colspan='7' style='text-align: center'>暂无数据</td></tr>"
                    }
                }
                $("#table-status-"+status+" tbody").html(html);
                if( typeof callback ==='function'){
                    callback(data.totalCount);
                }
            }
        });
    }
});