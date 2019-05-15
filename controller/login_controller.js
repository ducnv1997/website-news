

class LoginController {

    async loginView(context) {
        if(context.authentication.checkSessionLogined()) {
            return context.redirect('/dashboard');
        }
        await context.render('login.njk.html');
    }

    async handleLogin(context) {
        let username = context.request.body.username;
        let password = context.request.body.password;
        
        
        let idUser = await context.authentication.checkAcc(username,password);
        if(idUser){
            context.authentication.createSessionLogined(idUser);
            return context.redirect('/dashboard');
        }
        context.redirect('/admin');
    }
}
module.exports = LoginController;