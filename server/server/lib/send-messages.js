import moment from 'moment';
import Schedule from '../api/schedule/schedule.model';
import formatDate from './format-date';
import sendMessage from './send-message';

/**
 * return an array of phone numbers
 */
// TODO: refactor phonenumber into own model.
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

function now() {
  return moment().utcOffset(800);
}

function isToday(date) {
  let ret = moment(date).startOf('day').isSame(moment().startOf('day'));
  return ret;
}

function isTomorrow(date) {
  let datePlusOneDay = moment(date).add(1, 'days').startOf('day');
  let tomorrow = moment().add(1, 'days').startOf('day');

  let ret = datePlusOneDay.isSame(tomorrow);
  return ret;
}

function messageDate(date) {
  let messageDate;

  switch (date) {
    case isToday(date):
      messageDate = 'today';
      break;
    case isTomorrow(date):
      messageDate = 'tomorrow';
      break;
    default:
      let formatedDate = formatDate(date, 'ddd MMM Do');
      messageDate = `on ${formatedDate}`;
  }
  console.log('messageDate', messageDate);
  return messageDate;
}

function sendMessages(model) {
  Schedule.populate(model, 'client sitter', function(err, schedule) {
    let date = messageDate(schedule.startDate);
    let startTime = formatDate(schedule.startDate, 'h:mm A');
    let endTime = formatDate(schedule.endDate, 'h:mm A');
    let message = '';

    if( process.env.TwilioTesting === 'true' ) {
      message += 'This is only a test. ';
    }

    message += `${schedule.sitter.firstName} is baby sitting for the ${schedule.client.familyName}'s ${date}`;
    message += ` starting at ${startTime} finishing about ${endTime}`;

    sendMessage(phoneNumbers(schedule), message, function(){
      return serializer(schedule.toObject(), res);
    });
  });
}

export default sendMessages;
