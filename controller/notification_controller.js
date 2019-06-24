class NotificationController {
    async handleToken(context) {
        let token   = context.request.body.token;
        let tokened = await context.tokenRepository.getTokenByToken(token);
        if (!tokened.length) {
            return await context.tokenRepository.storeToken(token);
        }
        
    }

    async sendNotification(context) {
        let tokens   = await context.tokenRepository.getAllToken();
        tokens       = tokens.map(token => token.token);

        let  message = {
            notification:{
                title : 'Tin tức mới',
                body : context.title
            },
            webpush: {
                "fcm_options": {
                  "link": "https://www.google.com/"
                }
              }
    
        };

        context.fcm.sendToMultipleToken(message,tokens,function(err, response) {
            for (let i = 0; i < response.length; i++) {
                if (response[i].response == "Error sending message:") {
                    context.tokenRepository.deleteToken(response[i].token);
                }
            }

        });
    }

}
module.exports = NotificationController;