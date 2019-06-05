class InfoUserController {
    async changePassword(context) {
        let statusChangedPassword = context.session.changePassword;
        context.render('frontend/changepassword.njk.html', {statusChangedPassword});
        context.session.changePassword = null;
    }

    async handleChangePassword(context) {
        try {
            await context.adminRepository.changePassword(context.session.UserLogined.id, context.newPassword);
            context.redirect('back');
            context.session.changePassword = "Change success";
        } catch (error) {
            context.redirect('back');
            context.session.changePassword = "Change fail";
        }
       

    }
}

module.exports = InfoUserController;