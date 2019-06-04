class NotFoundController{
    async index(context){
        context.render('frontend/404.njk.html');
    }
}

module.exports = NotFoundController;