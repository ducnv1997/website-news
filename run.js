const router            = require('./route');
const koa               = require('koa');
const knexFile          = require('./knexfile')
const knex              = require('knex')(knexFile['development']);
const userProvider      = require('./admin/admin.provider');
const cateProvider      = require('./category/category.provider');
const postProvider      = require('./post/post.provider');
const nunjuckProvider   = require('./nunjucks.provider');
const hashProvider      = require('./hash/hash.provider');
const authProvider      = require('./auth/authentication.provider');
const middleware        = require('./middleware/middleware.provider');
const commentProvider   = require('./comment/comment.provider');
const likeProvider      = require('./like/like.provider');

const imageProvider     = require('./upload/image.Provider');
const fs                = require('fs'); 
const path              = require('path');
const static            = require('koa-static');
const session           = require('koa-session');
const koaBodyParser     = require('koa-bodyparser');
const validator         = require('validator');


const app           = new koa();
const staticPath    = '/view';


app.keys = ['some secret hurr'];
app.use(static(
    path.join(__dirname, staticPath)
));


app.use(koaBodyParser())
app.use(session(app));
app.use(nunjuckProvider());
app.use(hashProvider(8));
app.use(userProvider(knex));
app.use(cateProvider(knex));
app.use(postProvider(knex));
app.use(authProvider());
app.use(imageProvider(fs));
app.use(middleware(validator));
app.use(commentProvider(knex));
app.use(likeProvider(knex));
app.use(router.routes());
app.listen(process.env.PORT, () => {
    console.log("server run in port " + process.env.PORT);
});