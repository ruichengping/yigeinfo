/**
 * Created by ruichengping on 2017/3/12.
 */
const User=require('../../orm/User');
const logger=require('../../config/log4js.config');
module.exports=(req,res,next) => {
    let userName=req.body.userName;
    let password=req.body.password;
    User.findOne({
        where:{
            userName:userName
        }
    }).then((result) => {
        logger.info('用户账号密码查询成功');
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
        logger.error('获取用户账号错误');
    });

};