/**
 * Created by wuming on 16/11/30.
 */
//设置内容区域的高度
$("#content_uploadImage").height($(window).height()-60);
$(window).on("resize",function () {
    $("#content_uploadImage").height($(window).height()-60);
});
$("#fileSelector").on("change",function (e) {
    var files= e.target.files||e.dataTransfer.files;
    console.log(files);
    if(window.FileReader){
        var reader=new FileReader();
        reader.onload=function (e) {
            $("#imageView").append("<img src='"+e.target.result+"' width='80px' height='80px'/>")
        }
        reader.readAsDataURL(files[0]);
    }
});
var config={
    runtimes: 'html5,flash,silverlight,html4',//上传插件初始化选用那种方式的优先级顺序，如果第一个初始化失败就走第二个，以此类推
    url:"/uploadImage/ajaxImage",//上传图片的地址
    max_file_size:'10mb',//上传文件的最大的长度
    chunk_size:'5mb',//当上传文件大于服务器接收文件大小限制的时候，可以分多次请求发给服务器
    filters:[
        {title: "Image files", extensions: "jpg,png,jpeg,gif"}
    ],
    rename:false,//是否重命名
    drop_element:"uploadArea",
    browse_button:"addFile",

}
var uploader=new plupload.Uploader(config);
uploader.init();
uploader.bind("FilesAdded",function (uploader,files) {
    $("#uploadArea .tips").remove()
    for(var i=0;i<files.length;i++){
        previewImage(files[i],function(imgsrc,fileId){
            $("#uploadArea").append("<li><img imgId='"+fileId+"' src='"+imgsrc+"' width='100px' height='100px'/><div class='deleteImg'>删除</div></li>");
        });
    }

});
uploader.bind("UploadProgress",function (uploader,file) {

});
uploader.bind("FileUploaded",function (uploader,files,result) {
    if(JSON.parse(result.response).success){
        alert("上传成功!");
        window.location.reload();
    }
});
//上传图片按钮
$("#uploadFile").on("click",function () {
    uploader.start();
});
//删除图片按钮
$(document).on("click",".deleteImg",function () {
    var domELe=$(this).parent();
    var imgId=$(this).prev().attr("imgId");
    for(var i=0;i<uploader.files.length;i++){
        if(uploader.files[i].id==imgId){
            domELe.remove();
            uploader.files.splice(i,1);
        }
    }
    if(uploader.files.length==0){
        $("#uploadArea").append("<li class='tips'>"
            +"<img src='/images/addFileInfo.png' alt='tipImage' width='120px' height='120px'/>"
            +"<br>"
            +"<span>拖动图片到此处</span>"
            +"</li>");
    }
});
//删除图片按钮显示
$(document).on("mouseover","#uploadArea li",function () {
    $(this).children(".deleteImg").show();
}).on("mouseout","#uploadArea li",function () {
    $(this).children(".deleteImg").hide();
});
//预览图片函数
function previewImage(file,callback){//file为plupload事件监听函数参数中的file对象,callback为预览图片准备完成的回调函数
    if(!file || !/image\//.test(file.type)) return; //确保文件是图片
    if(file.type=='image/gif'){//gif使用FileReader进行预览,因为mOxie.Image只支持jpg和png
        var fr = new mOxie.FileReader();
        fr.onload = function(){
            callback(fr.result,file.id);
            fr.destroy();
            fr = null;
        }
        fr.readAsDataURL(file.getSource());
    }else{
        var preloader = new mOxie.Image();
        preloader.onload = function() {
            preloader.downsize( 300, 300 );//先压缩一下要预览的图片,宽300，高300
            var imgsrc = preloader.type=='image/jpeg' ? preloader.getAsDataURL('image/jpeg',80) : preloader.getAsDataURL(); //得到图片src,实质为一个base64编码的数据
            callback && callback(imgsrc,file.id); //callback传入的参数为预览图片的url
            preloader.destroy();
            preloader = null;
        };
        preloader.load( file.getSource() );
    }
}
//复制按钮显示
$(document).on("mouseover",".img_ContentItem",function () {
    $(this).children(".copy").show();
}).on("mouseout",".img_ContentItem",function () {
    $(this).children(".copy").hide();
});
//复制按钮
$(document).on("click",".copy",function () {
    var url=$(this).prev().attr("href");
    console.log(url);
    setCopy(url);
    alert("复制成功!")
});
//复制到剪贴板的脚本
function setCopy(_sTxt){
    try{
        if(window.clipboardData) {
            window.clipboardData.setData("Text", _sTxt);
        } else if(window.netscape) {
            netscape.security.PrivilegeManager.enablePrivilege('UniversalXPConnect');
            var clip = Components.classes['@mozilla.org/widget/clipboard;1'].createInstance(Components.interfaces.nsIClipboard);
            if(!clip) return;
            var trans = Components.classes['@mozilla.org/widget/transferable;1'].createInstance(Components.interfaces.nsITransferable);
            if(!trans) return;
            trans.addDataFlavor('text/unicode');
            var str = new Object();
            var len = new Object();
            var str = Components.classes["@mozilla.org/supports-string;1"].createInstance(Components.interfaces.nsISupportsString);
            var copytext = _sTxt;
            str.data = copytext;
            trans.setTransferData("text/unicode", str, copytext.length*2);
            var clipid = Components.interfaces.nsIClipboard;
            if (!clip) return false;
            clip.setData(trans, null, clipid.kGlobalClipboard);
        }
    }catch(e){
        throw e;
    }
}