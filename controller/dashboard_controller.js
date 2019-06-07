class DashboardController {

    async index(context) {
        let user = context.session.logined;
        await context.render('admin/dashboard.njk.html',{user});
    }

    async logout(context) {
        context.authentication.destroySessionLogined();
        context.redirect('/admin');
    }
}

module.exports = DashboardController;