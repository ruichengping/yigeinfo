/**
 * Created by rcp1 on 2016/11/29.
 */
var  multer=require('multer');
var storage = multer.diskStorage({
    //设置上传后文件路径，uploads文件夹会自动创建。
    destination: function (req, file, cb) {
        cb(null, './public/uploadImages')
    },
    //给上传文件重命名，获取添加后缀名
    filename: function (req, file, cb) {
        var fileFormat = (file.originalname).split(".");
        cb(null, file.fieldname + '-' + Date.now() + "." + fileFormat[fileFormat.length - 1]);
    }
});
//添加配置文件到muler对象。
var upload = multer({
    storage: storage
});

//如需其他设置，请参考multer的limits,使用方法如下。
//var upload = multer({
//    storage: storage,
//    limits:{}
// });

//导出对象
module.exports = upload;
//其他说明:
// 1.文件上传有以下方法
//
// muilter.single(‘file’), //适用于单文件上传
// muilter.array(‘file’,num), //适用于多文件上传，num为最多上传个数，上传文件的数量可以小于num,
// muilter.fields(fields), //适用于混合上传，比如A类文件1个，B类文件2个。官方API有详细说明。
//     2.file为上传字段名称，当使用form表单submit方式上传时，必须与表单上传的name属性保持一致。
// 表单记得加上  enctype=‘multipart/form-data’
//
// 3.对上传文件大小限制，名称限制等均可在limits中加上，具体可加属性，请参考官方api。