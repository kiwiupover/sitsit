import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('schedules');
  this.route('clients');
  this.route('sitters');
});

export default Router;
