import twilio from 'twilio/lib';
import ENV from 'dotenv';
ENV.load();

const client = twilio(process.env.TwilioAccountSID, process.env.TwilioAuthToken);

function sendMessage(numbers, message) {
  console.log('sendMessage', numbers, message);
  if (numbers.length === undefined) { return } ;

  if (process.env.TwilioTesting === 'true') {
    numbers = [process.env.TwilioTestPhone];
  }

  return numbers.forEach(function(number){
    return client.sendMessage({

        to: number, // Any number Twilio can deliver to
        from: process.env.TwilioPhone, // A number you bought from Twilio and can use for outbound communication
        body: message // body of the SMS message

    }, function(err, responseData) { //this function is executed when a response is received from Twilio
        if (err) {
          console.log('err', err);
        }

        if (!err) { // "err" is an error received during the request, if any

            // "responseData" is a JavaScript object containing data received from Twilio.
            // A sample response from sending an SMS message is here (click "JSON" to see how the data appears in JavaScript):
            // http://www.twilio.com/docs/api/rest/sending-sms#example-1

            console.log(responseData.from); // outputs "+14506667788"
            console.log(responseData.body); // outputs "word to your mother."
        }
    });
  });
}

export default sendMessage;
