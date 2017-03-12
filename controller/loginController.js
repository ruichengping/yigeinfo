/**
 * Created by ruichengping on 2017/3/12.
 */
const getPasswordByUserName=require("../service/getPasswordByUserName");
module.exports=(req,res,next) => {
    let userName=req.body.userName;
    let password=req.body.password;
    getPasswordByUserName(userName,password,(result) => {
        if(password==result.password){
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

        };
    });
}