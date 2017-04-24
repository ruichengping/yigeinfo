/**
 * Created by ruichengping on 2017/4/25.
 */
module.exports=(req,res,next) => {
    delete req.session.user;
    res.send({
        'success':true
    });
};