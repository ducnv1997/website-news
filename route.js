const Route = require('koa-router');
const route = new Route();
const fs = require('fs')
const multer  =   require('koa-multer');
const storage =   multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, './view/public/images');
    },
    filename: function (req, file, callback) {
      let imageName = Date.now() +"-"+ file.originalname;
      callback(null,imageName);
    }
  });
const upload = multer({ storage : storage}).array('image',100)





const DashBoardControllers  = require('./controller/dashboard_controller');
const LoginController       = require('./controller/login_controller');
const CategoryController    = require('./controller/category_controller');
const PostController        = require('./controller/post_controller');

const dashboardController   = new DashBoardControllers();
const loginController       = new LoginController();
const categoryController    = new CategoryController();
const postController        = new PostController();



route.get('/admin',loginController.loginView);
route.get('/dashboard',dashboardController.index);
route.post('/handlelogin',loginController.handleLogin);
route.post('/logout',dashboardController.logout);

route.get('/category',categoryController.index);
route.get('/editcategory',categoryController.editCategory);
route.post('/handleeditcategory',categoryController.handleEditCategory);
route.get('/addcategory',categoryController.addCategory);
route.post('/handleaddcategory',categoryController.handleAddCategory);
route.post('/deletecategory',categoryController.deleteCategory);


route.get('/post',postController.index);
route.get('/addpost',postController.addPost);

route.get('/files',async function(context) {
  const images = fs.readdirSync('view/public/images')
  var sorted = []
  for (let item of images){
      if(item.split('.').pop() === 'png'
      || item.split('.').pop() === 'jpg'
      || item.split('.').pop() === 'jpeg'
      || item.split('.').pop() === 'svg'){
          var abc = {
                "image" : "public/images/"+item,
                "folder" : '/'
          }
          sorted.push(abc)
      }
  }
  context.body = sorted;
});


route.post('/uploadimages',upload, async(context) => {
  console.log('999');
  console.log(context.request)
});
route.post('/handleaddpost', postController.handleAddPost);





module.exports = route;


