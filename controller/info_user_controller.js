class InfoUserController {

    async infoUser(context) {
        let user = await context.userRepository.getUserByUsername(context.session.UserLogined.username);
        context.render('frontend/infouser.njk.html',{user});
    }

    async handleeditinfo(context) {
        let oldAvatarPath = "view" + context.session.UserLogined.avatar;

        try {
            context.image.deleteImage(oldAvatarPath);
            await context.userRepository.changeInfo(context.session.UserLogined.id, context.fullname, context.address, context.email, context.avatar);

            let user = await context.userRepository.getUserByUsername(context.session.UserLogined.username);

            context.authentication.createSessionUserLogined(user[0])
            context.alert('success');
            
        } catch (error) {
            context.alert('An error occurred. Please try again later');
        }
        context.redirect('back');
    }

    async changePassword(context) {
        let statusChangedPassword = context.session.changePassword;
        context.render('frontend/changepassword.njk.html', {statusChangedPassword});
        context.session.changePassword = null;
    }

    async handleChangePassword(context) {
        try {
            await context.userRepository.changePassword(context.session.UserLogined.id, context.newPassword);
            context.redirect('back');
            context.session.changePassword = "Change success";
        } catch (error) {
            context.redirect('back');
            context.session.changePassword = "Change fail";
        }
       
    }
}

module.exports = InfoUserController;