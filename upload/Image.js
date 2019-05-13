

class Image {
    constructor(upload) {
        this.upload  = upload;
    }

    async uploadImage(){
    var multer  =   require('koa-multer');
    var storage =   multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, './');
    },
    filename: function (req, file, callback) {
      let tenfile = Date.now() + file.originalname
      callback(null,tenfile);
    }
  });
  var upload = multer({ storage : storage})
    upload.array('uploadimages',20);
       console.log("day la ham upload images");
        
    }
    // async uploadImage() {
    //     console.log('aj')
    //     let a = context.request.body.username;
    //     console.log(a)
    // }
}

module.exports = Image;