class FacebookController {

    async loginFB(context) {
        let dataUser = context.request.body.data;

        let checkUsername   = await context.adminRepository.checkUsernameBeforeRegisterUser(dataUser.id);

        if (!checkUsername.length) {
            await context.adminRepository.registerUserWithFacebook(dataUser.first_name +' ' + dataUser.last_name, dataUser.id, dataUser.id);

        }
        
        context.authentication.createSessionUserLogined(checkUsername[0]);
        context.response.body = process.env.PORT;

    }
}

module.exports = FacebookController;