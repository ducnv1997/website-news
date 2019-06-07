
class LoginedMiddleware {
    async checkAdminLogined(context, next) {
        if(!context.session.logined){
            return context.redirect('/admin');
        }
        await next();
    }

    async checkUserLogined(context, next) {
        if(!context.session.UserLogined){
            return context.redirect('/');
        }
        await next();
    }

    async checkUserLoginedBeforeLike(context, next){
        if(!context.session.UserLogined){
            context.response.body = false;
        }else{
            await next();
        }
        
    }
}

module.exports = LoginedMiddleware;
