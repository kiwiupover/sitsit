'use strict';

var _merge = require('lodash/merge');

var _merge2 = _interopRequireDefault(_merge);

var _client = require('./client.model');

var _client2 = _interopRequireDefault(_client);

var _client3 = require('./client.serializer');

var _client4 = _interopRequireDefault(_client3);

var _camelcaseKeys = require('../../lib/camelcase-keys');

var _camelcaseKeys2 = _interopRequireDefault(_camelcaseKeys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Get list of clients
exports.index = function (req, res) {
  _client2.default.find().lean().exec(function (err, clients) {
    if (err) {
      return handleError(res, err);
    }

    res.status(200);

    return serializer(clients, res);
  });
};

// Get a single client
exports.show = function (req, res) {
  _client2.default.findById(req.params.id).lean().exec(function (err, client) {
    if (err) {
      return handleError(res, err);
    }
    if (!client) {
      return res.status(404).send('Not Found');
    }

    return serializer(client, res);
  });
};

// Creates a new client in the DB.
exports.create = function (req, res) {
  _client2.default.create((0, _camelcaseKeys2.default)(req.body.data.attributes), function (err, client) {
    if (err) {
      return handleError(res, err);
    }
    res.status(201);

    return serializer(client.toJSON(), res);
  });
};

// Updates an existing client in the DB.
exports.update = function (req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  _client2.default.findById(req.params.id, function (err, client) {
    if (err) {
      return handleError(res, err);
    }
    if (!client) {
      return res.status(404).send('Not Found');
    }
    var updated = (0, _merge2.default)(client, (0, _camelcaseKeys2.default)(req.body.data.attributes));
    updated.save(function (err) {
      if (err) {
        return handleError(res, err);
      }
      res.status(200);

      return serializer(client.toJSON(), res);
    });
  });
};

// Deletes a client from the DB.
exports.destroy = function (req, res) {
  _client2.default.findById(req.params.id, function (err, client) {
    if (err) {
      return handleError(res, err);
    }
    if (!client) {
      return res.status(404).send('Not Found');
    }
    client.remove(function (err) {
      if (err) {
        return handleError(res, err);
      }
      return res.status(204).send('No Content');
    });
  });
};

function serializer(model, res) {
  var json = new _client4.default(model).serialize();
  return res.send(json);
};

function handleError(res, err) {
  return res.status(500).send(err);
}