/**
 * Created by wuming on 16/11/29.
 */
var express=require("express");
var muilter=require("../myModule/CommonTools/multerUtil");
var insertUrl=require("../myModule/mysqlConn/resourcesUrl");
var router=express.Router();
var upload=muilter.array('file',10);
var urlData=[];
router.get("/",function (req,res,next) {
   insertUrl.getAllResourcesUrl(function (result) {
      urlData=result;
      next();
   });
},function (req,res) {
   console.log(urlData);
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
           var url=req.files[i].path.split("\\");
           url.shift();
           urlArray.push(url.join("/"));
        }
        console.log(urlArray);
        insertUrl.insertResourcesUrl(urlArray,function (result) {
           if(result.affectedRows==req.files.length){
               res.redirect("/uploadImage");
           }
        });
    });
});
module.exports=router;