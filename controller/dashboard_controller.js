class DashboardController {

    async index(context) {
        if(!context.authentication.checkSessionLogined()) {
            return context.redirect('/admin');
        }
        await context.render('dashboard.njk.html');
    }

    async logout(context) {
        context.authentication.destroySessionLogined();
        context.redirect('/admin');
    }
}

module.exports = DashboardController;