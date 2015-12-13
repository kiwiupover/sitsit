import Ember from 'ember';

export function isEqual([left, right], hash) {
  var result = false;
  if (hash && hash.ignoreCase === true) {
    result = String(left).toLowerCase() === String(right).toLowerCase();
  } else {
    result = left === right;
  }
  return result;
}

export default Ember.Helper.helper(isEqual);
