/**
 * Created by wuming on 16/11/29.
 */
var express=require("express");
var fs=require("fs");
var router=express.Router();
router.get("/",function (req,res) {
   res.render("uploadImage",{

   });
});
router.post("/ajaxImage",function (req,res) {
   console.log(req.body);
});
module.exports=router;