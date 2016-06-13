'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (obj) {
  return (0, _mapKeys2.default)(obj, function (value, key) {
    return (0, _camelCase2.default)(key);
  });
};

var _mapKeys = require('lodash/mapKeys');

var _mapKeys2 = _interopRequireDefault(_mapKeys);

var _camelCase = require('lodash/camelCase');

var _camelCase2 = _interopRequireDefault(_camelCase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }