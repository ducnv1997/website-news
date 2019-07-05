const Router      = require('koa-router');

const multer      = require('koa-multer');

const storage     = multer.diskStorage({
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
const NotificationController      = require('./controller/notification_controller')

const ValidatorFormMiddleware     = require('./middleware/validatorFormMiddleware');
const CacheMIddleware   = require('./middleware/CacheMIddleware');

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
const cacheMIddleware             = new CacheMIddleware();
const notificationController      = new NotificationController();



router.get('/admin', loginController.loginView);
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

router.get('/files',loginedMiddleware.checkAdminLogined,postController.getAllImages);
router.post('/admin/uploadimages',upload.array('image',100),validatorFormMiddleware.checkUploadImagesToSever);
router.post('/delete_file',postController.deleteImage);

router.get('/admin/post',loginedMiddleware.checkAdminLogined,postController.index);
router.get('/addpost',loginedMiddleware.checkAdminLogined,postController.addPost);
router.post('/admin/handleaddpost',upload.single('avatar'),validatorFormMiddleware.validateFormPost, postController.handleAddPost,notificationController.sendNotification );
router.post('/admin/deletepost',postController.deletePost,cacheMIddleware.destroyCachePostMostView);
router.get('/admin/editpost',loginedMiddleware.checkAdminLogined,postController.editPost);
router.post('/admin/handleeditpost',validatorFormMiddleware.validateFormEditPost,postController.handleEditPost);
router.post('/admin/loadmore',loginedMiddleware.checkAdminLogined, postController.index);
router.get('/admin/search', loginedMiddleware.checkAdminLogined, validatorFormMiddleware.validateFormSearch, postController.search );


// Router fronend**********************************************************

router.get('/', cacheMIddleware.savePosMostViewToCache,postControllerFrontend.index);
router.get('/contentpost',cacheMIddleware.savePosMostViewToCache, postControllerFrontend.contentPost);
router.get('/category',cacheMIddleware.savePosMostViewToCache, categoryControllerFrontend.index);
router.get('/search',cacheMIddleware.savePosMostViewToCache,validatorFormMiddleware.validateFormSearch,postControllerFrontend.search);

router.get('/login', logincontrollerfrontend.loginView);
router.post('/handlelogin',validatorFormMiddleware.validateFormLogin,logincontrollerfrontend.handleLogin);
router.get('/logout', logincontrollerfrontend.logout);
router.post('/loginfb',facebookController.loginFB);


router.get('/register', registerController.registerNewUser);
router.post('/handleregister', validatorFormMiddleware.validateFormRegister,registerController.handleregister);
router.post('/comment',loginedMiddleware.checkUserLogined, validatorFormMiddleware.validateFormComment, commentController.addcomment);
router.post('/deletecomment',loginedMiddleware.checkUserLogined, commentController.deleteComment);
router.post('/editcomment',loginedMiddleware.checkUserLogined, validatorFormMiddleware.validateFormComment, commentController.editComment);
router.post('/like', loginedMiddleware.checkUserLoginedBeforeLike,likeController.handleLike);

router.get('/notfound',notFoundController.index);
router.get('/change-password',loginedMiddleware.checkUserLogined,infoUSerController.changePassword);
router.post('/handle-change-password',loginedMiddleware.checkUserLogined,validatorFormMiddleware.validateFormChangePassword,infoUSerController.handleChangePassword);
router.get('/accountdetails', loginedMiddleware.checkUserLogined,infoUSerController.infoUser)
router.post('/handleeditinfo',loginedMiddleware.checkUserLogined,upload.single('avatar'),validatorFormMiddleware.validateFormEditInfo,infoUSerController.handleeditinfo)

router.post('/sendtoken',notificationController.handleToken);

module.exports = router;


