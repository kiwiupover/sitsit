import _ from 'lodash';
import Schedule from './schedule.model';
import Sitter from '../sitter/sitter.model';

import scheduleSerializer from './schedule.serializer';

// Get list of schedules
exports.index = function(req, res) {
  Schedule.find().lean().exec(function (err, schedules) {
    if(err) { return handleError(res, err); }

    res.status(200);

    Schedule.populate(schedules, '_client _sitter', function(err, schedules) {
      return serializer(schedules, res);
    });
  });
};

// Get a single schedule
exports.show = function(req, res) {
  Schedule.findById(req.params.id).lean().exec(function (err, schedule) {
    if(err) { return handleError(res, err); }
    if(!schedule) { return res.status(404).send('Not Found'); }

    Schedule.populate(schedule, '_client _sitter', function(err, schedule) {
      return serializer(schedule, res);
    });
  });
};

// Creates a new schedule in the DB.
exports.create = function(req, res) {
  var newSchedule = new Schedule({
    date: req.body.data.attributes.date,
    _sitter: req.body.data.relationships.sitter.data.id,
    _client: req.body.data.relationships.client.data.id
  });

  newSchedule.save(function (err, schedule) {
    if (err) return handleError(err);

    res.status(201);

    Schedule.populate(schedule, '_client _sitter', function(err, schedule) {
      return serializer(schedule.toJSON(), res);
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

      Schedule.populate(schedule, '_client _sitter', function(err, schedule) {
        return serializer(schedule.toJSON(), res);
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
