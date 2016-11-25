/**
 * Created by user on 16/10/13.
 */
var express=require("express");
var router=express.Router();
var id=1024;
router.get("/"+id+".html",function (req,res) {
    res.render("companyDetail");
});
module.exports=router;