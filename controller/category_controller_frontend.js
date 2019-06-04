class CategoryControllerFrontend {
    async index(context) {
        try {
            let limit           = 3;
            let currentPage     = context.query.page ? context.query.page : 1;
            let offset          = await context.paginatorMiddelware.calculateOffset(limit, currentPage);
            let totalPost       = await context.postRepository.countPostByCategory(context.query.id);
            let totalPage       = await context.paginatorMiddelware.calculateTotalPage(limit, totalPost);
    
            let posts = await context.postRepository.getDataPostByCategory(context.query.id, limit, offset);
            let categories = await context.categoryRepository.getAllCategory();
            let postsMostView = await context.postRepository.getPostMostView();
            context.render('frontend/category.njk.html', {posts, categories, postsMostView, totalPage, currentPage});
        
        } catch (error) {
            context.alert('An error occurred');
            context.redirect('/');
        }

      }
}

module.exports = CategoryControllerFrontend;