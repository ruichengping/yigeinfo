/**
 * Created by wuming on 16/11/29.
 */
var express=require("express");
var muilter=require("../myModule/CommonTools/multerUtil");
var insertUrl=require("../myModule/mysqlConn/resourcesUrl");
var router=express.Router();
var upload=muilter.array('file');
var urlData=[];
router.get("/",function (req,res,next) {
   insertUrl.getAllResourcesUrl(function (result) {
      urlData=result;
      next();
   });
},function (req,res) {
    res.render("uploadImage",{
       urlData:urlData
    });
});
router.post("/ajaxImage",function (req,res) {
    upload(req, res, function (err) {
        //添加错误处理
        if (err) {
            return  console.log(err);
        }
        //文件信息在req.file或者req.files中显示。
        var urlArray=[];
        for(var i=0;i<req.files.length;i++){
           var url="uploadImages/"+req.files[i].filename;
           urlArray.push(url);
        }
        insertUrl.insertResourcesUrl(urlArray,function (result) {
           if(result.affectedRows==req.files.length){
               res.send({
                   success:true
               });
           }
        });
    });
});
module.exports=router;