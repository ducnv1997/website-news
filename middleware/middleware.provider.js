const ControllerMiddleware      = require('./controllerMiddelware');
const ValidateFormMiddleware    = require('./validateFormMiddleware');
const alert                     = require('alert-node');
module.exports = (validator) => {
    return async (context, next)=> {

        const controllerMiddelware      = new ControllerMiddleware();
        const validateFormMiddleware    = new ValidateFormMiddleware(validator);

        context.controllerMiddleware    = controllerMiddelware;
        context.validateFormMiddleware  = validateFormMiddleware;
        context.alert                   = alert;
        await next();
    }
}