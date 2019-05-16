

class LoginController {

    async loginView(context) {
        await context.render('login.njk.html');
    }

    async handleLogin(context) {
        let username = context.request.body.username;
        let password = context.request.body.password;
        
        
        let idUser = await context.authentication.checkAcc(username,password);
        if(idUser){
            context.authentication.createSessionLogined(idUser);
            return context.redirect('/admin/dashboard');
        }
        context.redirect('/admin');
    }
}
module.exports = LoginController;