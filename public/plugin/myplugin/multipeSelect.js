/**
 * Created by ruichengping on 2017/3/19.
 */
layui.define(function(exports){ //提示：模块也可以依赖其它模块，如：layui.define('layer', callback);
    var obj = {
        hello: function(str){
            alert('Hello '+ (str||'test'));
        }
    };

    //输出test接口
    exports('multipeSelect', obj);
});