import Ember from 'ember';

const { computed } = Ember;

export default Ember.Component.extend({
  times: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],

  minutes: ['00', '15', '30', '45'],
  theTime: '',
  theMinutes: '00',
  amPM: 'PM',

  time: computed('theTime', 'theMinutes', 'amPM', function(){
    return `${this.get('theTime')} :${this.get('theMinutes')} ${this.get('amPM')}`
  }),

  actions: {
    setTime(time) {
      this.set('theTime', time);
    },

    setMinutes(minute) {
      this.set('theMinutes', minute);
    },

    setAmPm(ampm) {
      this.set('amPM', ampm);
    },

    continue(){
      this.sendAction('action', this.get('time'));
    }
  }
});
