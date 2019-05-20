
class LoginController {

    async loginView(context) {
        await context.render('login.njk.html', );
    }

    async handleLogin(context, next) {
        let username    = await context.validateFormMiddleware.sanitizerData(context.request.body.username);
        let password    = await context.validateFormMiddleware.sanitizerData(context.request.body.password);
        let checkEmpty  = await context.validateFormMiddleware.checkEmptyDataForm([username, password]);        
        let user        = await context.authentication.checkAcc(username, password);

        if(user && user.role === 'admin'){ 
            context.authentication.createSessionLogined(user.id);
            return context.redirect('/admin/dashboard');
        }
        if(checkEmpty){
            context.alert(checkEmpty);
        }else{
            context.alert('username or password is incorrect ');
        }
        context.redirect('/admin');
        await next();
    }
    
}
module.exports = LoginController;