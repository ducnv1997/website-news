module.exports = async(context, next)=>{
    if(!context.session.logined){
        context.redirect('/admin');
    }
    await next();
}