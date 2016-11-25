/**
 * Created by user on 16/10/8.
 */
var express=require('express');
var router=express.Router();
router.get("/",function (req,res) {
   req.session.user="";
    res.redirect("/login");
});
module.exports=router;