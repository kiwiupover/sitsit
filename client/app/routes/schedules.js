import Ember from 'ember';
import moment from 'moment';

const { RSVP, isBlank } = Ember

export default Ember.Route.extend({

  model() {
    return RSVP.hash({
      schedules: this.store.findAll('schedule'),
      clients: this.store.findAll('client'),
      sitters: this.store.findAll('sitter')
    });
  },

  setupController(){
    this._super(...arguments);

    this.setupSchedule();

    if (isBlank(this.controller.get('startTime'))) {
      this.transitionTo('schedules.index');
    }
  },

  actions: {
    startDate(date){
      this.controller.set('startsAt', date);
    },

    sitterSelected(sitter){
      let theSitter = this.store.peekRecord('sitter', sitter);
      this.controller.set('sitter', theSitter);
    },

    clientSelected(client){
      let theClient = this.store.peekRecord('client', client);
      this.controller.set('client', theClient);
    },

    setStartTime(time){
      let startDate = moment(this.controller.get('startsAt'));
      startDate.set(time);
      this.controller.set('startDate', startDate.toDate());
      this.transitionTo('schedules.setup.end-time');
    },

    setEndTime(time){
      let endDate = moment(this.controller.get('startsAt'));
      endDate.set(time);
      this.controller.set('endDate', endDate.toDate());
      this.transitionTo('schedules.setup.confirm');
    },

    toStartTime() {
      this.transitionTo('schedules.setup.start-time');
    },

    save(){
      let newSchedule = this.store.createRecord('schedule', {
        startDate: this.controller.get('startDate'),
        endDate: this.controller.get('endDate'),
        sitter:  this.controller.get('sitter'),
        client:  this.controller.get('client')
      });

      newSchedule.save();

      this.setupSchedule();

      this.transitionTo('schedules');
    }
  },

  setupSchedule(){
    let dateNow = new Date();

    this.controller.setProperties({
      minDate: dateNow,
      startHour: dateNow.getUTCHours(),
      startsAt: null,
      sitter: null,
      client: null,
      startDate: null,
      endDate: null
    });
  }
});
