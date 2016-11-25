var express = require('express');
var mysql=require("../myModule/mysqlConn/mysqlconfig");
var router = express.Router();
//登录路由
router.get('/', function(req, res, next) {
  res.render("Login");
});
router.post("/",function (req,res,next) {
  var pool=mysql.pool;
  var userName=req.body.userName;
  var password=req.body.password;
    pool.getConnection(function (err,connection) {
        if (err) {
            console.log("POOL ==> " + err);
        }
        connection.query("SELECT password FROM users WHERE userName='"+userName+"'",function (err,result) {
            if(err){
                throw  err;
            }else{
                if(password==result[0].password){
                    req.session.user=userName;
                    res.send({
                        status:"success",
                    });
                }else{
                    res.send({
                        status:"error",
                        data:"用户名或密码错误！"
                    });

                };
            }
        });
        connection.release();
    });
});

module.exports = router;
