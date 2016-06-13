'use strict';

var _merge = require('lodash/merge');

var _merge2 = _interopRequireDefault(_merge);

var _sendMessages = require('../../lib/send-messages');

var _sendMessages2 = _interopRequireDefault(_sendMessages);

var _schedule = require('./schedule.model');

var _schedule2 = _interopRequireDefault(_schedule);

var _sitter = require('../sitter/sitter.model');

var _sitter2 = _interopRequireDefault(_sitter);

var _camelcaseKeys = require('../../lib/camelcase-keys');

var _camelcaseKeys2 = _interopRequireDefault(_camelcaseKeys);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _schedule3 = require('./schedule.serializer');

var _schedule4 = _interopRequireDefault(_schedule3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.load();

// Get list of schedules
exports.index = function (req, res) {
  _schedule2.default.find({
    startDate: {
      $gte: (0, _moment2.default)().subtract(61, 'minutes')
    }
  }).sort({ startDate: 'asc' }).exec(function (err, schedules) {
    if (err) {
      return handleError(res, err);
    }

    res.status(200);

    _schedule2.default.populate(schedules, 'client sitter', function (err, schedules) {
      var sch = schedules.map(function (schedule) {
        return schedule.toObject();
      });

      return serializer(sch, res);
    });
  });
};

// Get a single schedule
exports.show = function (req, res) {

  _schedule2.default.findById(req.params.id).exec(function (err, schedule) {
    if (err) {
      return handleError(res, err);
    }
    if (!schedule) {
      return res.status(404).send('Not Found');
    }

    _schedule2.default.populate(schedule, 'client sitter', function (err, schedule) {
      return serializer(schedule.toObject(), res);
    });
  });
};

// Creates a new schedule in the DB.
exports.create = function (req, res) {
  var attributes = (0, _camelcaseKeys2.default)(req.body.data.attributes);

  attributes = (0, _merge2.default)(attributes, {
    sitter: req.body.data.relationships.sitter.data.id,
    client: req.body.data.relationships.client.data.id,
    sentDayBeforeMessage: false,
    sentHourBeforeMessage: false
  });

  var newSchedule = new _schedule2.default(attributes);

  newSchedule.save(function (err, schedule) {
    if (err) return handleError(err);

    (0, _sendMessages2.default)(schedule);

    res.status(201);
  });
};

// Updates an existing schedule in the DB.
exports.update = function (req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  _schedule2.default.findById(req.params.id, function (err, schedule) {
    if (err) {
      return handleError(res, err);
    }
    if (!schedule) {
      return res.status(404).send('Not Found');
    }

    var updated = (0, _merge2.default)(schedule, req.body.data.attributes);

    updated.save(function (err) {
      if (err) {
        return handleError(res, err);
      }

      res.status(200);

      _schedule2.default.populate(schedule, 'client sitter', function (err, schedule) {
        return serializer(schedule.toObject(), res);
      });
    });
  });
};

// Deletes a schedule from the DB.
exports.destroy = function (req, res) {
  _schedule2.default.findById(req.params.id, function (err, schedule) {
    if (err) {
      return handleError(res, err);
    }
    if (!schedule) {
      return res.status(404).send('Not Found');
    }
    schedule.remove(function (err) {
      if (err) {
        return handleError(res, err);
      }
      return res.status(204).send('No Content');
    });
  });
};

function serializer(model, res) {
  var json = new _schedule4.default(model).serialize();
  return res.send(json);
};

function handleError(res, err) {
  return res.status(500).send(err);
}