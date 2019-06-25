class InfoUserController {

    async infoUser(context) {
        let user = await context.userRepository.getUserByUsername(context.session.UserLogined.username);
        context.render('frontend/infouser.njk.html',{user});
    }

    async handleeditinfo(context) {
        let oldAvatarPath = "view" + context.session.UserLogined.avatar;
        let avatar        = context.avatar
        try {

            if (avatar) {
                await context.userRepository.changeAvatar(context.session.UserLogined.id,context.avatar);
                context.image.deleteImage(oldAvatarPath);
            }
            await context.userRepository.changeInfo(context.session.UserLogined.id, context.fullname, context.address, context.email);

            let user = await context.userRepository.getUserByUsername(context.session.UserLogined.username);

            context.authentication.createSessionUserLogined(user[0])
            
        } catch (error) {
            context.redirect('/notfound');
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