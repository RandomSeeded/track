
const { twilioId, twilioAuthToken, twilioPhoneNumber } = require('../secrets');
const client = require('twilio')(twilioId, twilioAuthToken);

async function sendSMS(body, phoneNumber) {
  if (process.env.NODE_ENV === 'DEV') {
    console.log('not sending SMS due to NODE_ENV=dev', body);
    return;
  }
  console.log('sending SMS', body);
  return client.messages
    .create({
      to: phoneNumber,
      from: twilioPhoneNumber,
      body,
    })
    .then((message) => console.log(`Message sent: ${message.sid}`));
}

module.exports = {
  sendSMS,
};
