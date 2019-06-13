module.exports = async (context, next) => {
    await next();
    let status = await context.response.status
    if (status == 404 ) {
        context.redirect('/notfound');
    }
}