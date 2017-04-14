/**
 * Created by wuming on 2017/4/14.
 */
const log4js = require('log4js');
const path=require('path');
const getCurrentTime=require('../tool/getCurrentTime');
//配置log4js
log4js.configure({
    appenders: [
        { type: 'console' }, //控制台输出
        {
            type: 'file', //文件输出
            filename: path.resolve(__dirname,'../logs/'+getCurrentTime(),'/'+getCurrentTime()+'.log'),
            maxLogSize: 1024,
            backups:3,
            category: 'normal'
        }
    ]
});
const logger=log4js.getLogger('yigeInfo');
module.exports=logger;