class CategoryController {


    async index(context) {
        let categorys = await context.categoryRepository.getAllCategory();
        let user      = context.session.logined
        context.render('admin/categoryadmin.njk.html', {categorys, user});
    }

    async addCategory(context) {
        let user      = context.session.logined

        context.render('admin/addcategory.njk.html',{user});
    }

    async handleAddCategory(context) {
        let category = await context.categoryRepository.checkNameCategory(context.nameCategory);
        
       if(category.length) {
            return context.redirect('back');
        }
        await context.categoryRepository.addCategory(context.nameCategory);
        context.nameCategory = null;
        context.redirect('/admin/category');
    }
    
    async editCategory(context) {
        let name        =context.query.name;
        let user        = context.session.logined

        context.render('admin/editcategory.njk.html',{ name , user});
        context.session.idcate = context.query.id;
    }

    async handleEditCategory(context) {
        let category = await context.categoryRepository.checkNameCategory(context.nameCategory);
        if(category.length) {
            return context.redirect('back');
        }

        if(context.session.idcate) {
            context.categoryRepository.editCategoryById(context.session.idcate, context.nameCategory);
        }
        
        context.session.idcate  = null;
        context.nameCategory    = null;
        context.redirect('/admin/category');
    }

    async deleteCategory(context) {
        let id = context.request.body.id;
        context.response.body = await context.categoryRepository.deleteCategoryById(id);
    }
}

module.exports = CategoryController;