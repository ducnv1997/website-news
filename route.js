const Router      = require('koa-router');
const validator   = require('validator');
const xss         = require('xss');
const alert       = require('alert-node');

const multer      =   require('koa-multer');

const storage     =   multer.diskStorage({
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
const LoginedMiddleware           = require('./middleware/LoginedMiddleware.');
const LoginControllerFrontend     = require('./controller/login_controller_frontend');
const RegisterController          = require('./controller/register_controller');
const UserController              = require('./controller/user_controller');
const CommentController           = require('./controller/comment_controller');
const LikeController              = require('./controller/like_controller');
const FacebookController          = require('./controller/facebook_controller');
const NotFoundController          = require('./controller/notFound_controller');
const InfoUSerController          = require('./controller/info_user_controller');

const ValidatorFormMiddleware     = require('./middleware/validatorFormMiddleware');

const router = new Router();

const validatorFormMiddleware     = new ValidatorFormMiddleware();
const loginedMiddleware           = new LoginedMiddleware();
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
const notFoundController          = new NotFoundController();
const infoUSerController          = new InfoUSerController();



router.get('/admin',loginController.loginView);
router.get('/admin/dashboard',loginedMiddleware.checkAdminLogined,dashboardController.index);
router.post('/admin/handlelogin',validatorFormMiddleware.validateFormLogin,loginController.handleLogin);
router.post('/logout',dashboardController.logout);

router.get('/admin/category',loginedMiddleware.checkAdminLogined,categoryController.index);
router.get('/admin/editcategory',loginedMiddleware.checkAdminLogined,categoryController.editCategory);
router.post('/admin/handleeditcategory',validatorFormMiddleware.validateFormCategoryName,categoryController.handleEditCategory);
router.get('/admin/addcategory',loginedMiddleware.checkAdminLogined,categoryController.addCategory);
router.post('/admin/handleaddcategory',validatorFormMiddleware.validateFormCategoryName,categoryController.handleAddCategory);
router.post('/admin/deletecategory',categoryController.deleteCategory);

router.get('/admin/manageruser',loginedMiddleware.checkAdminLogined,userController.index);
router.post('/admin/appointuser',userController.appointUser);
router.post('/admin/deleteuser',userController.deleleUser);
router.post('/admin/demotiont',userController.demotiontUser);

router.get('/files',loginedMiddleware.checkAdminLogined,postController.getImages);
router.post('/admin/uploadimages',upload.array('image',100), postController.uploadImages);
router.post('/delete_file',postController.deleteImage);

router.get('/admin/post',loginedMiddleware.checkAdminLogined,postController.index);
router.get('/addpost',loginedMiddleware.checkAdminLogined,postController.addPost);
router.post('/admin/handleaddpost',upload.single('avatar'),validatorFormMiddleware.validateFormPost, postController.handleAddPost);
router.post('/admin/deletepost',postController.deletePost);
router.get('/admin/editpost',loginedMiddleware.checkAdminLogined,postController.editPost);
router.post('/admin/handleeditpost',validatorFormMiddleware.validateFormEditPost,postController.handleEditPost);


// Router fronend**********************************************************

router.get('/', postControllerFrontend.index);
router.get('/contentpost', postControllerFrontend.contentPost);
router.get('/category', categoryControllerFrontend.index);
router.get('/search',validatorFormMiddleware.validateFormSearch,postControllerFrontend.search);

router.get('/login', logincontrollerfrontend.loginView);
router.post('/handlelogin',validatorFormMiddleware.validateFormLogin,logincontrollerfrontend.handleLogin);
router.get('/logout', logincontrollerfrontend.logout);
router.post('/loginfb',facebookController.loginFB);


router.get('/register', registerController.registerNewUser);
router.post('/handleregister', validatorFormMiddleware.validateFormRegister,registerController.handleregister);
router.post('/comment', validatorFormMiddleware.validateFormComment, commentController.addcomment);
router.post('/deletecomment', commentController.deleteComment);
router.post('/editcomment',validatorFormMiddleware.validateFormComment, commentController.editComment);
router.post('/like', likeController.handleLike);

router.get('/notfound',notFoundController.index);
router.get('/change-password',loginedMiddleware.checkUserLogined,infoUSerController.changePassword);
router.post('/handle-change-password',loginedMiddleware.checkUserLogined,validatorFormMiddleware.validateFormChangePassword,infoUSerController.handleChangePassword);





module.exports = router;


