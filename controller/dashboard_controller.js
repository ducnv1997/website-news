class DashboardController {

    async index(context) {
        await context.render('dashboard.njk.html');
    }

    async logout(context) {
        context.authentication.destroySessionLogined();
        context.redirect('/admin');
    }
}

module.exports = DashboardController;