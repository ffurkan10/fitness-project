const sendPushNotification = async (expoPushToken, title, message) => {
  if (!expoPushToken?.startsWith('ExponentPushToken')) return;
  
  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      to: expoPushToken,
      sound: 'default',
      title,
      body: message,
      data: { type: 'notification' },
    }),
  });
};
export default sendPushNotification