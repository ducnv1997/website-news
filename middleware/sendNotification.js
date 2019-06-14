const webpush = require('web-push');
module.exports = async (context) => {
const publicVapidKey    ="BKxIATK8O1NOjQsrxD-Mc50eXgZRHuUJWFFGAFKvGsqY_mIw42SfuZ67670EQOd8EiqMTezg9lMtHZQD1oQB-6s";
const privateVapidKey   = "pLzlbAsZ12rl-o1j9OjT4Hp7OXRsZEfbUx7YfqwZHSo";

webpush.setVapidDetails(
  "mailto:test@test.com",
  publicVapidKey,
  privateVapidKey
);

  let subscription = context.session.subscription;
  let payload = { title: context.title }
  payload = JSON.stringify(payload);
  webpush
    .sendNotification(subscription,payload)
    .catch(err => console.error(err));
}
