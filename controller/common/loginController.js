/**
 * Created by ruichengping on 2017/3/12.
 */
const User=require('../../orm/User');
module.exports=(req,res,next) => {
    let userName=req.body.userName;
    let password=req.body.password;
    User.findAll({
        where:{
            userName:userName
        }
    }).then(function (result) {
        if(result.length>0){
            if(password==result[0].dataValues.password){
                req.session.user=userName;
                res.send({
                    success:true,
                    msg:"登录成功！"
                });
            }else{
                res.send({
                    success:false,
                    msg:"用户名或密码错误！"
                });
            }
        }else{
            res.send({
                success:false,
                msg:"该账号不存在，请找管理申请"
            });
        }
    });

};