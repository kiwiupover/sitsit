import _ from 'lodash';
import sendMessage from '../../lib/send-message';
import Schedule from './schedule.model';
import Sitter from '../sitter/sitter.model';
import formatDate from '../../lib/format-date';

import ENV from 'dotenv';
ENV.load();

import scheduleSerializer from './schedule.serializer';

// Get list of schedules
exports.index = function(req, res) {
  Schedule.find().exec(function (err, schedules) {
    if(err) { return handleError(res, err); }

    res.status(200);

    Schedule.populate(schedules, 'client sitter', function(err, schedules) {
      let sch = schedules.map((schedule)=> {
        return schedule.toObject();
      });

      return serializer(sch, res);
    });
  });
};

// Get a single schedule
exports.show = function(req, res) {
  Schedule.findById(req.params.id).exec(function (err, schedule) {
    if(err) { return handleError(res, err); }
    if(!schedule) { return res.status(404).send('Not Found'); }

    Schedule.populate(schedule, 'client sitter', function(err, schedule) {
      return serializer(schedule.toObject(), res);
    });
  });
};

// Creates a new schedule in the DB.
exports.create = function(req, res) {
  console.log('req.body', req.body);
  var newSchedule = new Schedule({
    startDate: req.body.data.attributes['start-date'],
    endDate: req.body.data.attributes['end-date'],
    sitter: req.body.data.relationships.sitter.data.id,
    client: req.body.data.relationships.client.data.id
  });

  newSchedule.save(function (err, schedule) {
    if (err) return handleError(err);

    res.status(201);

    Schedule.populate(schedule, 'client sitter', function(err, schedule) {
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
  });
};

// Updates an existing schedule in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Schedule.findById(req.params.id, function (err, schedule) {
    if (err) { return handleError(res, err); }
    if(!schedule) { return res.status(404).send('Not Found'); }

    let updated = _.merge(schedule, req.body.data.attributes);

    updated.save(function (err) {
      if (err) { return handleError(res, err); }

      res.status(200);

      Schedule.populate(schedule, 'client sitter', function(err, schedule) {
        return serializer(schedule.toObject(), res);
      });
    });
  });
};

// Deletes a schedule from the DB.
exports.destroy = function(req, res) {
  Schedule.findById(req.params.id, function (err, schedule) {
    if(err) { return handleError(res, err); }
    if(!schedule) { return res.status(404).send('Not Found'); }
    schedule.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function serializer(model, res) {
  const json = new scheduleSerializer(model).serialize();
  return res.send(json);
};

function handleError(res, err) {
  return res.status(500).send(err);
}

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
