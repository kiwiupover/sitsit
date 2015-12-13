import Ember from 'ember';
import moment from 'moment';

export function formatDate(params, hash) {
  if (params) {
    // params[0] from template, params form js file
    var date = Ember.isArray(params) ? params[0] : params;

    // Get the provided format or default to 'L'
    var format = hash && hash.format ? hash.format : 'L';

    // Format and return
    return moment(date).format(format);
  }
}

export default Ember.Helper.helper(formatDate);
