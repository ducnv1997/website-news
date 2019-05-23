class RegisterController{
    async registerNewUser (context) {
        let success     = context.session.success;
        context.render('frontend/register.njk.html' , {success})
        context.session.success     = null;
    }

    async handleregister(context) {
        let fullname        = await context.validateFormMiddleware.sanitizerData(context.request.body.fullname);
        let address         = await context.validateFormMiddleware.sanitizerData(context.request.body.address);
        let email           = await context.validateFormMiddleware.sanitizerData(context.request.body.email);
        let username        = await context.validateFormMiddleware.sanitizerData(context.request.body.username);
        let password        = await context.validateFormMiddleware.sanitizerData(context.request.body.password);
        password            = await context.hasher.hashPassword(password);
        let checkEmpty      = await context.validateFormMiddleware.checkEmptyDataForm([username, password, fullname, email]);
        // let checkEmail      = await context.adminRepository.checkEmailBeforeRegisterUser(email);
        let checkUsername   = await context.adminRepository.checkUsernameBeforeRegisterUser(username);

        if (checkEmpty) {
            context.alert(checkEmpty);
        }else if (checkUsername.length) {
            context.alert("username đã được sủ dụng")
        }else {
            await context.adminRepository.registerUser(fullname, address, email, username, password);
            context.session.success = "Register success";
        }
        return context.redirect('/register');
    }

}
module.exports = RegisterController;