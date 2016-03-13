'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lib = require('twilio/lib');

var _lib2 = _interopRequireDefault(_lib);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.load();

var client = (0, _lib2.default)(process.env.TwilioAccountSID, process.env.TwilioAuthToken);

function sendMessage(numbers, message) {
  console.log('sendMessage', numbers, message);
  if (numbers.length === undefined) {
    return;
  };

  if (process.env.TwilioTesting === 'true') {
    numbers = [process.env.TwilioTestPhone];
  }

  return numbers.forEach(function (number) {
    return client.sendMessage({

      to: '+1 ' + number, // Any number Twilio can deliver to
      from: process.env.TwilioPhone, // A number you bought from Twilio and can use for outbound communication
      body: message // body of the SMS message

    }, function (err, responseData) {
      //this function is executed when a response is received from Twilio
      if (err) {
        console.log('err', err);
      }

      if (!err) {
        // "err" is an error received during the request, if any
        console.log(responseData.from); // outputs "+14506667788"
        console.log(responseData.body); // outputs "word to your mother."
      }
    });
  });
}

exports.default = sendMessage;