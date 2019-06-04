const PaginatorMiddelware       = require('./PaginatorMiddelware.');
const alert                     = require('alert-node');


module.exports = () => {
    return async (context, next)=> {

        const paginatorMiddelware      = new PaginatorMiddelware();
        context.paginatorMiddelware    = paginatorMiddelware;
        context.alert                  = alert;
        await next();
    }
}