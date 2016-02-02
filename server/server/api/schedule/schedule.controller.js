import merge from 'lodash/merge';
import sendMessages from '../../lib/send-messages';
import Schedule from './schedule.model';
import Sitter from '../sitter/sitter.model';

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
  var newSchedule = new Schedule({
    startDate: req.body.data.attributes['start-date'],
    endDate: req.body.data.attributes['end-date'],
    sitter: req.body.data.relationships.sitter.data.id,
    client: req.body.data.relationships.client.data.id
  });

  newSchedule.save(function (err, schedule) {
    if (err) return handleError(err);

    sendMessages(schedule);

    res.status(201);
  });
};

// Updates an existing schedule in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Schedule.findById(req.params.id, function (err, schedule) {
    if (err) { return handleError(res, err); }
    if(!schedule) { return res.status(404).send('Not Found'); }

    let updated = merge(schedule, req.body.data.attributes);

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
