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
    sitterSelected(sitter){
      let theSitter = this.store.peekRecord('sitter', sitter);
      this.controller.set('sitter', theSitter);
    },

    clientSelected(client){
      let theClient = this.store.peekRecord('client', client);
      this.controller.set('client', theClient);
      console.log('client', theClient);
    },

    setStartTime(time){
      console.log('start time', time);
      this.controller.set('startTime', time);
      this.transitionTo('schedules.end-time');
    },

    setEndTime(time){
      console.log('end time', time);
      this.controller.set('endTime', time);
      this.transitionTo('schedules.sitter');
    },

    save(){
      let startDate = moment(this.controller.get('startsAt'));
      let endDate = moment(this.controller.get('startsAt'));

      startDate.set(this.controller.get('startTime'));
      endDate.set(this.controller.get('endTime'));

      let newSchedule = this.store.createRecord('schedule', {
        startDate: startDate.toDate(),
        endDate: endDate.toDate(),
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
      client: null

    });
  }
});
