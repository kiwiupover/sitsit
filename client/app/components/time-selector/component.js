import Ember from 'ember';
import moment from 'moment';

import {
  validator, buildValidations
}
from 'ember-cp-validations';

let Validations = buildValidations({
  hour: [
    validator('presence', {
      presence: true,
      message: 'Please enter a time'
    })
  ],
  minute: validator('presence', true)
});

const { computed } = Ember;

export default Ember.Component.extend(Validations, {
  didValidate: false,
  times: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],

  minutes: ['00', '15', '30', '45'],
  hour: '',
  minute: '',
  amPM: 'PM',

  isInvalid: computed.and('didValidate', 'validations.attrs.hour.isInvalid'),

  time: computed('hour', 'minute', 'amPM', function(){
    let hour = parseInt(this.get('hour'), 10);

    if (this.get('amPM') === 'PM') {
      hour += 12;
    }

    return {
      hours: hour,
      minutes: this.get('minute')
    };
  }),

  displayTime: computed('time', 'hour', function(){
    let ret = moment().hour(this.get('time').hours).minute(this.get('time').minutes).seconds('00');

    if(this.get('hour')) {
      return ret.format('LT');
    }
  }),


  // willRender() {
  //   if (!this.hour ) {
  //     this.set('hour', this.startHour.toString());
  //   }
  // },

  actions: {
    setHour(time) {
      this.set('hour', time);
    },

    setMinutes(minute) {
      this.set('minute', minute);
    },

    setAmPm(ampm) {
      this.set('amPM', ampm);
    },

    setTime(){
      this.set('didValidate', true);

      this.validate().then(({validations}) => {
        if (validations.get('isValid')) {
          this.attrs.setTime(this.get('time'));
        }
      }, (errors) => {
        console.log('errors', errors);
      });
    }
  }
});
