class LoginControllerFrontend {

    async loginView(context) {
        await context.render('frontend/login.njk.html');
    }

    async handleLogin(context) {
       
        let user  = await context.authentication.checkAcc(context.username,context.password);
        if(!user) { 
            context.alert("username or password is incorrect");
            return context.redirect('/login');
        }

        context.authentication.createSessionUserLogined(user);
        context.username = null;
        context.password = null;
        return context.redirect('/');

    }

    
    async logout(context) {
        context.authentication.destroySessionUserLogined();
        context.redirect('/');
    }

}

module.exports = LoginControllerFrontend;