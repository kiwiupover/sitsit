import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('schedules', function() {
    this.route('setup', function(){
      this.route('details');
      this.route('start-time');
      this.route('end-time');
      this.route('confirm');
    });
  });
  this.route('clients');
  this.route('sitters');
});

export default Router;
