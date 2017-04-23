/**
 * Created by ruichengping on 2017/4/23.
 */
layui.use(['form','element','laypage','layer'], function(){
    var layer=layui.layer;
    var element = layui.element();
    element.on('tab(complaintTab)', function(elem){
        $('input[name=status]').val(elem.index);
        getComplaintListData();
    });
    //数据初始化
    getComplaintListData(function (totalCount) {
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
    $(document).on('click','.complaintHandle',function () {
        var innerHtml=$("#complaintHandleHtml").html();
        layer.open({
            type: 1,
            area: ['400px', '240px'],
            content: innerHtml //这里content是一个普通的String
        });
        $("input[name=complaintId]").val($(this).attr('complaintId'));
    });
    $(document).on('click','.btn-complaintHandle-post',function () {
      $.ajax({
          type:'post',
          url:'/dailyManage/handleComplaint.json',
          data:$("#complaint-handle-form").serialize()
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
    $("#search").on('click',getComplaintListData);
    function getComplaintListData(callback) {
        $.ajax({
            type:'post',
            url:'/dailyManage/getComplaint.json',
            data:$("#complaint-filter").serialize()
        }).done(function (data) {
            var html='';
            if(data.success){
                var status=$("input[name=status]").val();
                if(status==0){
                    data.complaintList.forEach(function (complaintItem) {
                        html+='<tr>'
                            +'<td>'+complaintItem.id+'</td>'
                            +'<td>'+complaintItem.complaintName+'</td>'
                            +'<td>'+complaintItem.defendantName+'</td>'
                            +'<td>'+complaintItem.content+'</td>'
                            +'<td>'+complaintItem.createTime+'</td>'
                            +"<td style='text-align: center;'><button complaintId='"+complaintItem.id+"' type='button' class='layui-btn layui-btn-small layui-btn-normal complaintHandle'>完成处理</button></td>"
                            +'</tr>';
                    });
                }else{
                    data.complaintList.forEach(function (complaintItem) {
                        html+='<tr>'
                            +'<td>'+complaintItem.id+'</td>'
                            +'<td>'+complaintItem.complaintName+'</td>'
                            +'<td>'+complaintItem.defendantName+'</td>'
                            +'<td>'+complaintItem.content+'</td>'
                            +'<td>'+complaintItem.createTime+'</td>'
                            +'<td>'+complaintItem.handleResult+'</td>'
                            +"<td>已处理</td>"
                            +'</tr>';
                    });
                }
                if(html===''){
                    html="<tr><td colspan='6' style='text-align: center'>暂无数据</td></tr>"
                }
                $("#table-status-"+status+" tbody").html(html);
                if( typeof callback ==='function'){
                    callback(data.totalCount);
                }
            }
        });
    }
});