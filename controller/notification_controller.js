class NotificationController {
    async handleToken(context) {
        let token   = context.request.body.token;
        let tokened = await context.tokenRepository.getTokenByToken(token);
        if (!tokened.length) {
            return await context.tokenRepository.storeToken(token);
        }
        
    }

    async sendNotification(context) {
        let urlClickAction = context.request.protocol + '://' +  context.request.get('host') + "/contentpost?id=" + context.idpost;

        let tokens   = await context.tokenRepository.getAllToken();
        tokens       = tokens.map(token => token.token);

        let  message = {
            data: {
                title : context.title,
                body : "Bài viết mới",
                click_action: urlClickAction
            }
        };

        context.fcm.sendToMultipleToken(message,tokens,function(err, response) {
            console.log(response)
            for (let i = 0; i < response.length; i++) {
                if (response[i].response == "Error sending message:") {
                    context.tokenRepository.deleteToken(response[i].token);
                }
            }

        });
    }

}
module.exports = NotificationController;