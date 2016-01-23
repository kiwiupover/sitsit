import Schedule from '../api/schedule/schedule.model';
import formatDate from './format-date';
import sendMessage from './send-message';

/**
 * return an array of phone numbers
 */
function phoneNumbers(model) {
  let phoneNumbers = [];

  isPhonePresentPushNumber(model.client.primaryPhone, phoneNumbers);
  isPhonePresentPushNumber(model.client.secondaryPhone, phoneNumbers);
  isPhonePresentPushNumber(model.sitter.phone, phoneNumbers);
  isPhonePresentPushNumber(model.sitter.parentPrimaryPhone, phoneNumbers);
  isPhonePresentPushNumber(model.sitter.parentSecondayPhone, phoneNumbers);

  return phoneNumbers;
}

function isPhonePresentPushNumber(phoneNumber, array){
  if (phoneNumber) {
    return array.push(phoneNumber)
  }
}

function sendMessages(model) {
  Schedule.populate(model, 'client sitter', function(err, schedule) {
    let date = formatDate(schedule.startDate, 'ddd MMM Do');
    let startTime = formatDate(schedule.startDate, 'h:mm A');
    let endTime = formatDate(schedule.endDate, 'h:mm A');
    let message = '';

    if( process.env.TwilioTesting === 'true' ) {
      message += 'This is only a test. ';
    }

    message += `${schedule.sitter.firstName} is baby sitting for the ${schedule.client.familyName}'s on ${date}`;
    message += ` starting at ${startTime} finishing about ${endTime}`;

    sendMessage(phoneNumbers(schedule), message, function(){
      return serializer(schedule.toObject(), res);
    });
  });
}

export default sendMessages;
