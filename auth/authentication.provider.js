const Authenntication = require('./Authentication');

module.exports = () => {
    return async (context, next)=> {
        const authentication = new Authenntication(context.userRepository, context.hasher, context.session);
        context.authentication = authentication;
        await next();
    }
}