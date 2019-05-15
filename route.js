const Router = require('koa-router');
const router = new Router();
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
const upload = multer({ storage : storage})



const DashBoardControllers  = require('./controller/dashboard_controller');
const LoginController       = require('./controller/login_controller');
const CategoryController    = require('./controller/category_controller');
const PostController        = require('./controller/post_controller');

const dashboardController   = new DashBoardControllers();
const loginController       = new LoginController();
const categoryController    = new CategoryController();
const postController        = new PostController();



router.get('/admin',loginController.loginView);
router.get('/dashboard',dashboardController.index);
router.post('/handlelogin',loginController.handleLogin);
router.post('/logout',dashboardController.logout);

router.get('/category',categoryController.index);
router.get('/editcategory',categoryController.editCategory);
router.post('/handleeditcategory',categoryController.handleEditCategory);
router.get('/addcategory',categoryController.addCategory);
router.post('/handleaddcategory',categoryController.handleAddCategory);
router.post('/deletecategory',categoryController.deleteCategory);


router.get('/post',postController.index);
router.get('/addpost',postController.addPost);

router.get('/files',postController.getImages);
router.post('/uploadimages',upload.array('image',100), postController.uploadImages);

router.post('/delete_file',postController.deleteImage)
router.post('/handleaddpost',upload.single('avatar'), postController.handleAddPost);
router.post('/deletepost',postController.deletePost);
router.get('/editpost',postController.editPost);
router.post('/handleeditpost', postController.handleEditPost);



module.exports = router;


