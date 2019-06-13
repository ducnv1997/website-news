

class Image {

    constructor(fs, upload) {
        this.fs     = fs;
        this.upload = upload
    }

    readImages() {
        const images = this.fs.readdirSync('view/public/images');
        let data = [];
        for (let item of images){
          if(item.split('.').pop() === 'png'
          || item.split('.').pop() === 'jpg'
          || item.split('.').pop() === 'jpeg'
          || item.split('.').pop() === 'svg'){
              var imgIndo = {
                    "image" : "/public/images/"+item,
                    "folder" : '/'
              }
              data.push(imgIndo)
          }
      }
      return data;
    }

    deleteImage(path) {
      if(this.fs.existsSync(path)){
        let kq = this.fs.unlinkSync(path);
      }
    }
}

module.exports = Image;