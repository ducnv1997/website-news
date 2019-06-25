
importScripts('https://www.gstatic.com/firebasejs/4.3.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.3.1/firebase-messaging.js');
var config = {
    'messagingSenderId': '73174199799'
};
firebase.initializeApp(config);
const messaging = firebase.messaging();
self.addEventListener("notificationclick", function(event) {
    event.notification.close();
    let url = event.notification.data.click_action;
    return clients.openWindow(url);
  });


messaging.setBackgroundMessageHandler(function (payload) {
    
    let title = payload.data.title;
    let option = {
        body:payload.data.body,
        data:{
            click_action:payload.data.click_action
        }
    }

    return self.registration.showNotification(title,
        option);
});

