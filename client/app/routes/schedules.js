import Ember from 'ember';

const { RSVP } = Ember

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
    this.controller.set('minDate', new Date());
  },

  actions: {
    sitterSelected(sitter){
      let theSitter = this.store.peekRecord('sitter', sitter);
      this.controller.set('sitter', theSitter);
      console.log('sitter', theClient);
    },

    clientSelected(client){
      let theClient = this.store.peekRecord('client', client);
      this.controller.set('client', theClient);
      console.log('client', theClient);
    },

    setStartTime(time){
      this.controller.set('startTime', time);
    },

    setEndTime(time){
      this.controller.set('endTime', time);
    },

    save(){
      let newSchedule = this.store.createRecord('schedule', {
        date: this.controller.get('startsAt'),
        sitter:  this.controller.get('sitter'),
        client:  this.controller.get('client')
      });

      newSchedule.save();
    }
  }
});
