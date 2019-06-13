const moment = require('moment')

class PostControllerFrontend {

    async index(context) {
        try {
            let limit           = 5;
            let currentPage     = context.query.page ? context.query.page : 1;
            let offset          = await context.paginatorMiddelware.calculateOffset(limit, currentPage);
            let totalPost       = await context.postRepository.countPost();
            let totalPage       = await context.paginatorMiddelware.calculateTotalPage(limit, totalPost);
            let posts           = await context.postRepository.getAllPostByPage(limit,offset);
            let categories      = await context.categoryRepository.getAllCategory();
            let postsMostView   = await context.postRepository.getPostMostView();
            let user            = context.session.UserLogined;
            context.render('frontend/index.njk.html', {posts, categories, postsMostView, totalPage, currentPage, user});
       
        } catch (error) {

            context.alert('An error occurred. Please try again later');
            context.redirect('/notfound');
        }
      }

    async contentPost(context) {
    
        
        let liked           = '';
        let currentUrl      = context.request.protocol + '://' +  context.request.get('host') +  context.request.originalUrl;
        try {
            let post            = await context.postRepository.getDataPostById(context.query.id);
            let views           = await context.postRepository.increaseView(context.query.id, post[0].view);
            let categories      = await context.categoryRepository.getAllCategory();
            let postsMostView   = await context.postRepository.getPostMostView();
            let user            = context.session.UserLogined;
            let comments        = await context.commentRepository.getAllCommentByPost(context.query.id);

            if(user) {
                liked   = await context.likeRepository.checkLike(post[0].id, user.id);
            }
            context.render('frontend/contentpost.njk.html', {post, categories, views, postsMostView, user, comments, liked, currentUrl});
        } catch (error) {
            context.redirect('/notfound');
        }

    }

    async search(context) {
        try {
            let keyword         = context.keyword;
            let limit           = 3;
            let currentPage     = context.query.page ? context.query.page : 1;
            let offset          = await context.paginatorMiddelware.calculateOffset(limit, currentPage);
            let totalPost       = await context.postRepository.CountPostByKeyword(keyword);
            let totalPage       = await context.paginatorMiddelware.calculateTotalPage(limit, totalPost);

            let posts           = await context.postRepository.searchPostByKeyword(keyword, limit, offset);
            let categories      = await context.categoryRepository.getAllCategory();
            let postsMostView   = await context.postRepository.getPostMostView();

            context.render('frontend/searchpost.njk.html', {posts, categories, postsMostView, totalPage, currentPage, keyword});
            context.keyword = null;
        } catch (error) {
            context.alert('An error occurred. Please try again later');
            context.redirect('/');
        }
        
    }
}

module.exports = PostControllerFrontend;