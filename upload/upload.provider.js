const Image      = require('./Image');
var multer  =   require('koa-multer');
var storage =   multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, './uploads');
    },
    filename: function (req, file, callback) {
      let tenfile = Date.now() + file.originalname
      callback(null,tenfile);
    }
  });
var upload = multer({ storage : storage})
module.exports = () => {
    const image = new Image(upload);
    return async(context, next) => {
        context.image = image;
        await next();
    }
}