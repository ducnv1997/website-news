const PaginatorMiddelware       = require('./PaginatorMiddelware.');


module.exports = (cache, fcm) => {
    return async (context, next)=> {

        const paginatorMiddelware      = new PaginatorMiddelware();
        context.paginatorMiddelware    = paginatorMiddelware;
        context.cache                  = cache;
        context.fcm                    = fcm;
        await next();
    }
}