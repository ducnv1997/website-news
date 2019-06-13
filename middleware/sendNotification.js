const webpush = require('web-push')
module.exports = async (context) => {

  if ("serviceWorker" in navigator) {
    send().catch(err => console.error(err));
  }
  async function send() {
    // Register Service Worker
    console.log("Registering service worker...");
    const register = await navigator.serviceWorker.register("public/js/worker.js", {
      scope: "/public/js/"
    });
    console.log("Service Worker Registered...");
  
    // Register Push
    console.log("Registering Push...");
    const subscription = await register.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
    });
    console.log("Push Registered...");
  
   
    // Send Push Notification
    // console.log("Sending Push...");
    // await fetch("/subcribe", {
    //   method: "POST",
    //   body: JSON.stringify(subscription),
    //   headers: {
    //     "content-type": "application/json"
    //   }
    // });
    subscription = JSON.stringify(subscription);

    const payload = JSON.stringify({ title: "Push demo" });
    webpush
    .sendNotification(subscription,payload)
    .catch(err => console.error(err));
    console.log("Push Sent...");
  }
  // send();
  function urlBase64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, "+")
      .replace(/_/g, "/");
  
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
  
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }
}
