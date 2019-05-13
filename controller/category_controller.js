class CategoryController {


    async index(context) {
        let categorys = await context.categoryRepository.getAllCategory();
        if(!context.authentication.checkSessionLogined()) {
            return context.redirect('/admin');
        }
        context.render('categoryadmin.njk.html', {categorys});
    }

    async addCategory(context) {
        if(!context.authentication.checkSessionLogined()) {
            return context.redirect('/admin');
        }
        context.render('addcategory.njk.html');
    }

    async handleAddCategory(context,next) {
        if(!context.authentication.checkSessionLogined()) {
            return context.redirect('/admin');
        }
        let nameCategory = context.request.body.nameCategory;
        context.categoryRepository.addCategory(nameCategory);
        context.redirect('/category');
    }
    
    async editCategory(context) {
        if(!context.authentication.checkSessionLogined()) {
            return context.redirect('/admin');
        }
        let name = context.query.name;
        context.render('editcategory.njk.html',{ name });
        context.session.id = context.query.id;
    }

    async handleEditCategory(context,next) {
        let nameProduct = context.request.body.nameCategory;
        if(context.session.id) {
            context.categoryRepository.editCategoryById(context.session.id, nameProduct);
            context.session.id = null;
        } 
        context.redirect('/category');
    }

    async deleteCategory(context, next) {
        let id = context.request.body.id;
        context.response.body = await context.categoryRepository.deleteCategoryById(id);
        // context.response.body = "99999";
    }
}

module.exports = CategoryController;