import Sitter from './sitter.model';
import sitterSerializer from './sitter.serializer';
import merge from 'lodash/merge';
import camelCaseKeys from '../../lib/camelcase-keys';

// Get list of sitters
exports.index = function(req, res) {
  Sitter.find().lean().exec(function (err, sitters) {
    if(err) { return handleError(res, err); }
    res.status(200);

    return serializer(sitters, res);
  });
};

// Get a single sitter
exports.show = function(req, res) {
  Sitter.findById(req.params.id).lean().exec(function (err, sitter) {
    if(err) { return handleError(res, err); }
    if(!sitter) { return res.status(404).send('Not Found'); }

    return serializer(sitter, res);
  });
};

// Creates a new sitter in the DB.
exports.create = function(req, res) {
  let newSitter = camelCaseKeys(req.body.data.attributes);

  Sitter.create(newSitter, function(err, sitter) {
    if(err) { return handleError(res, err); }
    res.status(201);

    return serializer(sitter.toJSON(), res);
  });
};

// Updates an existing sitter in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Sitter.findById(req.params.id, function (err, sitter) {
    if (err) { return handleError(res, err); }
    if(!sitter) { return res.status(404).send('Not Found'); }

    let updated = merge(sitter, camelCaseKeys(req.body.data.attributes));

    updated.save(function (err) {
      if (err) { return handleError(res, err); }

      res.status(200);

      return serializer(sitter.toJSON(), res);
    });
  });
};

// Deletes a sitter from the DB.
exports.destroy = function(req, res) {
  Sitter.findById(req.params.id, function (err, sitter) {
    if(err) { return handleError(res, err); }
    if(!sitter) { return res.status(404).send('Not Found'); }
    sitter.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function serializer(model, res) {
  const json = new sitterSerializer(model).serialize();
  return res.send(json);
};

function handleError(res, err) {
  return res.status(500).send(err);
}
