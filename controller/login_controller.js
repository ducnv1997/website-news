

class LoginController {

    async loginView(context) {
        if(context.authentication.checkSessionLogined()) {
            return context.redirect('/dashboard');
        }
        await context.render('login.njk.html');
    }

    async handleLogin(context, next) {
        // console.log(context.request)
        let username = context.request.body.username;
        let password = context.request.body.password;
        
        
        let user = await context.authentication.checkAcc(username,password);
        if(user){
            context.authentication.createSessionLogined(username);
            return context.redirect('/dashboard');
        }
        context.redirect('/admin');
    }
}
module.exports = LoginController;