'use strict';

var _sitter = require('./sitter.model');

var _sitter2 = _interopRequireDefault(_sitter);

var _sitter3 = require('./sitter.serializer');

var _sitter4 = _interopRequireDefault(_sitter3);

var _merge = require('lodash/merge');

var _merge2 = _interopRequireDefault(_merge);

var _camelcaseKeys = require('../../lib/camelcase-keys');

var _camelcaseKeys2 = _interopRequireDefault(_camelcaseKeys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Get list of sitters
exports.index = function (req, res) {
  _sitter2.default.find().lean().exec(function (err, sitters) {
    if (err) {
      return handleError(res, err);
    }
    res.status(200);

    return serializer(sitters, res);
  });
};

// Get a single sitter
exports.show = function (req, res) {
  _sitter2.default.findById(req.params.id).lean().exec(function (err, sitter) {
    if (err) {
      return handleError(res, err);
    }
    if (!sitter) {
      return res.status(404).send('Not Found');
    }

    return serializer(sitter, res);
  });
};

// Creates a new sitter in the DB.
exports.create = function (req, res) {
  var newSitter = (0, _camelcaseKeys2.default)(req.body.data.attributes);

  _sitter2.default.create(newSitter, function (err, sitter) {
    if (err) {
      return handleError(res, err);
    }
    res.status(201);

    return serializer(sitter.toJSON(), res);
  });
};

// Updates an existing sitter in the DB.
exports.update = function (req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  _sitter2.default.findById(req.params.id, function (err, sitter) {
    if (err) {
      return handleError(res, err);
    }
    if (!sitter) {
      return res.status(404).send('Not Found');
    }

    var updated = (0, _merge2.default)(sitter, (0, _camelcaseKeys2.default)(req.body.data.attributes));

    updated.save(function (err) {
      if (err) {
        return handleError(res, err);
      }

      res.status(200);

      return serializer(sitter.toJSON(), res);
    });
  });
};

// Deletes a sitter from the DB.
exports.destroy = function (req, res) {
  _sitter2.default.findById(req.params.id, function (err, sitter) {
    if (err) {
      return handleError(res, err);
    }
    if (!sitter) {
      return res.status(404).send('Not Found');
    }
    sitter.remove(function (err) {
      if (err) {
        return handleError(res, err);
      }
      return res.status(204).send('No Content');
    });
  });
};

function serializer(model, res) {
  var json = new _sitter4.default(model).serialize();
  return res.send(json);
};

function handleError(res, err) {
  return res.status(500).send(err);
}