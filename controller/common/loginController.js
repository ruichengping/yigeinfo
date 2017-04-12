/**
 * Created by ruichengping on 2017/3/12.
 */
const User=require('../../orm/User');
module.exports=(req,res,next) => {
    let userName=req.body.userName;
    let password=req.body.password;
    User.findOne({
        where:{
            userName:userName
        }
    }).then((result) => {
            if(password==result.get('password')){
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
    }).catch((err) =>{
        console.log(err);
    });

};