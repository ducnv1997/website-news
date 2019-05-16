const Router = require('koa-router');
const router = new Router();
const multer  =   require('koa-multer');
const storage =   multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, './view/public/images');
    },
    filename: function (req, file, callback) {
      let extension = file.originalname.split('.').pop();
      let imageName = Date.now() +"."+ extension;
      callback(null,imageName);
    }
  });
const upload = multer({ storage : storage});



const DashBoardControllers        = require('./controller/dashboard_controller');
const LoginController             = require('./controller/login_controller');
const CategoryController          = require('./controller/category_controller');
const PostController              = require('./controller/post_controller');
const PostControllerFrontend      = require('./controller/post_controller_frontend');
const CategoryControllerFrontend  = require('./controller/category_controller_frontend');
const checkLogined                = require('./middleware/checkLoginedMiddleware');

const dashboardController         = new DashBoardControllers();
const loginController             = new LoginController();
const categoryController          = new CategoryController();
const postController              = new PostController();
const postControllerFrontend      = new PostControllerFrontend();
const categoryControllerFrontend  = new CategoryControllerFrontend();


router.get('/admin',loginController.loginView);
router.get('/admin/dashboard',checkLogined,dashboardController.index);
router.post('/admin/handlelogin',loginController.handleLogin);
router.post('/logout',dashboardController.logout);

router.get('/admin/category',checkLogined,categoryController.index);
router.get('/admin/editcategory',checkLogined,categoryController.editCategory);
router.post('/admin/handleeditcategory',categoryController.handleEditCategory);
router.get('/admin/addcategory',checkLogined,categoryController.addCategory);
router.post('/admin/handleaddcategory',categoryController.handleAddCategory);
router.post('/admin/deletecategory',categoryController.deleteCategory);

router.get('/files',checkLogined,postController.getImages);
router.post('/admin/uploadimages',upload.array('image',100), postController.uploadImages);
router.post('/delete_file',postController.deleteImage);

router.get('/admin/post',checkLogined,postController.index);
router.get('/addpost',checkLogined,postController.addPost);
router.post('/admin/handleaddpost',upload.single('avatar'), postController.handleAddPost);
router.post('/admin/deletepost',postController.deletePost);
router.get('/admin/editpost',checkLogined,postController.editPost);
router.post('/admin/handleeditpost', postController.handleEditPost);


// Router fronend**********************************************************

router.get('/', postControllerFrontend.index);
router.get('/contentpost', postControllerFrontend.contentPost);
router.get('/category', categoryControllerFrontend.index);

module.exports = router;


