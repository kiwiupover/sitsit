import Ember from 'ember';
import moment from 'moment';

const { computed } = Ember;

export default Ember.Component.extend({
  times: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],

  minutes: ['00', '15', '30', '45'],
  theTime: '',
  theMinutes: '00',
  amPM: 'PM',

  time: computed('theTime', 'theMinutes', 'amPM', function(){
    let hour = parseInt(this.get('theTime'), 10);
    let minutes = this.get('theMinutes');

    if (this.get('amPM') === 'PM') {
      hour = hour + 12;
    }

    return {
      hours: hour,
      minutes: minutes
    };
  }),

  displayTime: computed('time', function(){
    let ret = moment().hour(this.get('time').hours).minute(this.get('time').minutes).seconds('00');

    return ret.format('LT');
  }),

  willRender() {
    if (!this.theTime ) {
      this.set('theTime', this.startHour.toString());
    }
  },

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
