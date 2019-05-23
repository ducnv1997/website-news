const moment = require('moment')

class PostControllerFrontend {

    async index(context) {

        let limit           = 5;
        let currentPage     = context.query.page ? context.query.page : 1;
        let offset          = await context.controllerMiddleware.calculateOffset(limit, currentPage);
        let totalPost       = await context.postRepository.countPost();
        let totalPage       = await context.controllerMiddleware.calculateTotalPage(limit, totalPost);

        let posts           = await context.postRepository.getAllPostByPage(limit,offset);
        let categories      = await context.categoryRepository.getAllCategory();
        let postsMostView   = await context.postRepository.getPostMostView();
        let user            = context.session.UserLogined;

        context.render('frontend/index.njk.html', {posts, categories, postsMostView, totalPage, currentPage, user});
    }

    async contentPost(context) {

        let liked           = '';
        let post            = await context.postRepository.getDataPostById(context.query.id);
        let views           = await context.postRepository.increaseView(context.query.id, post[0].view);
        let categories      = await context.categoryRepository.getAllCategory();
        let postsMostView   = await context.postRepository.getPostMostView();
        let user            = context.session.UserLogined;
        let comments        = await context.commentRepository.getAllCommentByPost(context.query.id);

        if(user) {
             liked          = await context.likeRepository.checkLike(post[0].id, user.id);
        }

        context.render('frontend/contentpost.njk.html', {post, categories, views, postsMostView, user, comments, liked});
    }

    async search(context) {
        let limit           = 3;
        let keyword         = await context.validateFormMiddleware.sanitizerData(context.query.keyword);
        let currentPage     = context.query.page ? context.query.page : 1;
        let offset          = await context.controllerMiddleware.calculateOffset(limit, currentPage);
        let totalPost       = await context.postRepository.CountPostByKeyword(keyword);
        let totalPage       = await context.controllerMiddleware.calculateTotalPage(limit, totalPost);


        let posts = await context.postRepository.searchPostByKeyword(keyword, limit, offset);
        let categories = await context.categoryRepository.getAllCategory();
        let postsMostView = await context.postRepository.getPostMostView();
        context.render('frontend/searchpost.njk.html', {posts, categories, postsMostView, totalPage, currentPage, keyword})
    }
}

module.exports = PostControllerFrontend;