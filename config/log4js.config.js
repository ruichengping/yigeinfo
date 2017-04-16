/**
 * Created by wuming on 2017/4/14.
 */
const log4js = require('log4js');
const path=require('path');
//配置log4js
log4js.configure({
    appenders: [
        { type: 'console',category:'yige_console'}, //控制台输出
        {
            type: 'file', //文件输出
            filename: path.resolve(__dirname,'../logs/yigeInfo.log'),
            maxLogSize: 1024,
            pattern: "_yyyy-MM-dd",
            backups:3,
            category: 'yige_dateFileLog'
        },
    ],
    // replaceConsole:true
});
var yigeConsole=log4js.getLogger("yige_console");
var yigeDateFileLog=log4js.getLogger("yige_dateFileLog")
module.exports=yigeConsole;