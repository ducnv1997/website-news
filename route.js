const Router = require('koa-router');
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
const LoginControllerFrontend     = require('./controller/login_controller_frontend');
const RegisterController          = require('./controller/register_controller');
const UserController              = require('./controller/user_controller');
const CommentController           = require('./controller/comment_controller');
const LikeController              = require('./controller/like_controller');
const FacebookController          = require('./controller/facebook_controller')

const router = new Router();

const dashboardController         = new DashBoardControllers();
const loginController             = new LoginController();
const categoryController          = new CategoryController();
const postController              = new PostController();
const postControllerFrontend      = new PostControllerFrontend();
const categoryControllerFrontend  = new CategoryControllerFrontend();
const logincontrollerfrontend     = new LoginControllerFrontend();
const registerController          = new RegisterController();
const userController              = new UserController();
const commentController           = new CommentController();
const likeController              = new LikeController();
const facebookController          = new FacebookController(); 



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

router.get('/admin/manageruser',checkLogined,userController.index);
router.post('/admin/appointuser',userController.appointUser);
router.post('/admin/deleteuser',userController.deleleUser);
router.post('/admin/demotiont',userController.demotiontUser)



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
router.get('/search',postControllerFrontend.search);

router.get('/login', logincontrollerfrontend.loginView);
router.post('/handlelogin',logincontrollerfrontend.handleLogin);
router.get('/logout', logincontrollerfrontend.logout);
router.post('/loginfb',facebookController.loginFB);


router.get('/register', registerController.registerNewUser);
router.post('/handleregister', registerController.handleregister);
router.post('/comment', commentController.addcomment);
router.post('/deletecomment', commentController.deleteComment);
router.post('/editcomment', commentController.editComment);


router.post('/like', likeController.handleLike);






module.exports = router;


