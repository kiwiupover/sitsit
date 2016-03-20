import DS from 'ember-data';
import config from '../config/environment';

console.log('config', config.APP.APIURL);

export default DS.JSONAPIAdapter.extend({
  host: config.APP.APIURL,
  namespace: 'api'
});
