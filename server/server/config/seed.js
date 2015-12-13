/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
// Insert seed models below
var Schedule = require('../api/schedule/schedule.model');
var Client = require('../api/client/client.model');
var Sitter = require('../api/sitter/sitter.model');


// Insert seed data below
var scheduleSeed = require('../api/schedule/schedule.seed.json');
var clientSeed = require('../api/client/client.seed.json');
var sitterSeed = require('../api/sitter/sitter.seed.json');

// Insert seed inserts below
Schedule.find({}).remove(function() {
	Schedule.create(scheduleSeed);
});

Client.find({}).remove(function() {
	Client.create(clientSeed);
});

Sitter.find({}).remove(function() {
	Sitter.create(sitterSeed);
});
