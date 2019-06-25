const validator   = require('validator');
const xss         = require('xss');


class ValidatorFormMiddleware {

    async validateFormLogin(context, next) {
 
        let username = validator.trim(context.request.body.username);
        let password = validator.trim(context.request.body.password);

        username = xss(username);
        password = xss(password);

        if(validator.isEmpty(username) || validator.isEmpty(password)) {
            return context.redirect('back');
        }

        context.username = username;
        context.password = password;
        await next();
        

    }

    async validateFormRegister(context, next) {
        let fullname = validator.trim(context.request.body.fullname);
        let address  = validator.trim(context.request.body.address);
        let email    = validator.trim(context.request.body.email);
        let username = validator.trim(context.request.body.username);
        let password = validator.trim(context.request.body.password);


        if (validator.isEmpty(fullname) || validator.isEmpty(address) || validator.isEmpty(password)|| validator.isEmpty(username) || validator.isEmpty(email)) {
            return context.redirect('back');

        }else if(!validator.isEmail(email)){
            return context.redirect('back');
        }

        context.fullname = fullname;
        context.address  = address;
        context.email    = email;
        context.username = username;
        context.password = await context.hasher.hashPassword(password);
        await next();
    }

    async validateFormCategoryName (context, next) {
        let nameCategory    = validator.trim(context.request.body.nameCategory);
        nameCategory        = xss(nameCategory);

        if(validator.isEmpty(nameCategory)){
            return context.redirect('back');
        }

        context.nameCategory = nameCategory;
        await next();
    }

    async validateFormPost(context, next) {

        let title           = validator.trim(context.req.body.title);
        let idCategory      = validator.trim(context.req.body.cattegory);
        let description     = validator.trim(context.req.body.description);
        let content         = validator.trim(context.req.body.content);

        title           = xss(title);
        description     = xss(description);
        content         = xss(content);

        if(!context.req.file) {
            return context.redirect('back');
        }else if(!title || !description || !idCategory) {
            return context.redirect('back');
        }

        context.title       = title;
        context.description = description;
        context.idCategory  = idCategory;
        context.content     = content;
        context.pathAvatar  = (context.req.file.path).replace("view", "");
        await next();
    }

    async checkUploadImagesToSever(context, next) {
        if(!context.req.files.length){
            return context.redirect('/notfound');
        }
        context.redirect('back');
    }

    async validateFormEditPost(context, next) {

        let title           = validator.trim(context.request.body.title);
        let idCategory      = validator.trim(context.request.body.cattegory);
        let description     = validator.trim(context.request.body.description);
        let content         = validator.trim(context.request.body.content);

        title           = xss(title);
        description     = xss(description);
        content         = xss(content);

        if(!title || !description || !idCategory || !content) {
            return context.redirect('back');
        }

        context.title       = title;
        context.description = description;
        context.idCategory  = idCategory;
        context.content     = content;
        await next();
    }

    async validateFormSearch(context, next) {
        let keyword = context.query.keyword;
        if(!keyword) {
            return context.redirect('back');
        }
        keyword     = validator.trim(keyword);
        keyword     = xss(keyword);

        context.keyword = keyword;
        await next();
        
    }

    async validateFormComment(context, next){
        let message = validator.trim(context.request.body.message);
        message     = xss(message);

        if(validator.isEmpty(message)){
            return context.redirect('back');
        }
        context.message = message;
        await next();
        
    }

    async validateFormChangePassword(context, next) {
        let newPassword         = context.request.body.newpassword;
        let confirmPawssword    = context.request.body.confirmpassword;

        newPassword             = validator.trim(newPassword);
        confirmPawssword        = validator.trim(confirmPawssword);

        newPassword             = xss(newPassword);
        confirmPawssword        = xss(confirmPawssword);
        if (validator.isEmpty(newPassword) || validator.isEmpty(confirmPawssword)) {
            return context.redirect('back');
        }

        if (newPassword !== confirmPawssword) {
            return context.redirect('back');
        }
        context.newPassword =  await context.hasher.hashPassword(newPassword);;
        await next();
    }

    async validateFormEditInfo(context, next) {
        let fullname = context.req.body.fullname;
        let address  = context.req.body.address;
        let email    = context.req.body.email;

        fullname    = validator.trim(fullname);
        address     = validator.trim(address);
        email       = validator.trim(email);

        fullname    = xss(fullname);
        address     = xss(address);
        email       = xss(email);
        if(email && !validator.isEmail(email)){
            return context.redirect('back');
        }
       
        context.fullname    = fullname;
        context.address     = address;
        context.email       = email;
        if (context.req.file) {
            context.avatar = (context.req.file.path).replace("view", "");
        }
        await next();
    }

}

module.exports = ValidatorFormMiddleware;