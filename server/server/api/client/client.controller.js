import merge from 'lodash/merge';
import Client from './client.model';
import clientSerializer from './client.serializer';
import camelCaseKeys from '../../lib/camelcase-keys';

// Get list of clients
exports.index = function(req, res) {
  Client.find().lean().exec(function (err, clients) {
    if(err) { return handleError(res, err); }

    res.status(200);

    return serializer(clients, res);
  });
};

// Get a single client
exports.show = function(req, res) {
  Client.findById(req.params.id).lean().exec(function (err, client) {
    if(err) { return handleError(res, err); }
    if(!client) { return res.status(404).send('Not Found'); }

    return serializer(client, res);
  });
};

// Creates a new client in the DB.
exports.create = function(req, res) {
   Client.create(camelCaseKeys(req.body.data.attributes), function(err, client) {
    if(err) { return handleError(res, err); }
    res.status(201)

    return serializer(client.toJSON(), res);
  });
};

// Updates an existing client in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Client.findById(req.params.id, function (err, client) {
    if (err) { return handleError(res, err); }
    if(!client) { return res.status(404).send('Not Found'); }
    var updated = merge(client, camelCaseKeys(req.body.data.attributes));
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      res.status(200)

      return serializer(client.toJSON(), res);
    });
  });
};

// Deletes a client from the DB.
exports.destroy = function(req, res) {
  Client.findById(req.params.id, function (err, client) {
    if(err) { return handleError(res, err); }
    if(!client) { return res.status(404).send('Not Found'); }
    client.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function serializer(model, res) {
  const json = new clientSerializer(model).serialize();
  return res.send(json);
};

function handleError(res, err) {
  return res.status(500).send(err);
}
