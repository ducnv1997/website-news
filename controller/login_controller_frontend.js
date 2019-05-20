class LoginControllerFrontend {

    async loginView(context) {
        await context.render('frontend/login.njk.html');
    }

    async handleLogin(context) {
        let username    = await context.validateFormMiddleware.sanitizerData(context.request.body.username);
        let password    = await context.validateFormMiddleware.sanitizerData(context.request.body.password);
        let checkEmpty  = await context.validateFormMiddleware.checkEmptyDataForm([username, password]);        
        let user        = await context.authentication.checkAcc(username,password);
        
        if(checkEmpty){
            context.alert(checkEmpty)
            return context.redirect('/login');

        }else if(!user) { 
            context.alert("username or password is incorrect");
            return context.redirect('/login');
        }else{
            context.authentication.createSessionUserLogined(user.username);
            return context.redirect('/');
        }
        
    }
    
    async logout(context) {
        context.authentication.destroySessionUserLogined();
        context.redirect('/');
    }

}

module.exports = LoginControllerFrontend;