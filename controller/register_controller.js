class RegisterController{
    
    async registerNewUser (context) {
        let success     = context.session.success;
        context.render('frontend/register.njk.html' , {success})
        context.session.success     = null;
    }

    async handleregister(context) {

        let checkUsername   = await context.userRepository.checkUsernameBeforeRegisterUser(context.username);
        
        if (checkUsername.length) {
            context.alert("username đã được sủ dụng");
        }else {
            await context.userRepository.registerUser(context.fullname, context.address, context.email, context.username, context.password);
            context.session.success = "Register success";
        }

        context.fullname    = null;
        context.address     = null;
        context.email       = null;
        context.username    = null;
        context.password    = null;

        return context.redirect('/register');
    }

}
module.exports = RegisterController;