
const publicVapidKey =
"BKxIATK8O1NOjQsrxD-Mc50eXgZRHuUJWFFGAFKvGsqY_mIw42SfuZ67670EQOd8EiqMTezg9lMtHZQD1oQB-6s";

send();
async function send() {
  const register = await navigator.serviceWorker.register("/public/js/worker.js", {
    scope: "/public/js/"
  });
  console.log("Service Worker Registered...");

  console.log("Registering Push...");
  const subscription = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
  });
  console.log("Push Registered...");

  console.log("Sending Push...");
  await fetch("/pushnotification", {
    method: "POST",
    body: JSON.stringify(subscription),
    headers: {
      "content-type": "application/json"
    }
  });
  console.log("Push Sent...");
}

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