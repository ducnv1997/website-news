class FacebookController {

    async loginFB(context) {

        let dataUser = context.request.body.data;
        let checkUsername   = await context.userRepository.getUserByUsername(dataUser.id);

        if (!checkUsername.length) {
            await context.userRepository.registerUserWithFacebook(dataUser.first_name +' ' + dataUser.last_name, dataUser.id, dataUser.id, dataUser.picture.data.url);

        }
        
        context.authentication.createSessionUserLogined(checkUsername[0]);
        context.response.body = process.env.PORT;

    }
}

module.exports = FacebookController;