import Ember from 'ember';
import moment from 'moment';

import {
  validator, buildValidations
}
from 'ember-cp-validations';

let Validations = buildValidations({
  endDate: [
    validator('presence', true),
    validator('date', {
      description: 'Schedule end time',
      after() {
        return moment(this.model.get('startDate'));
      }
    })
  ]
});

export default Ember.Component.extend(Validations, {
  didValidate: false,
  startDate: null,
  endDate: null,

  actions: {
    setEndTime(time) {
      this.attrs.setTime(time);
      Ember.run.later(() => {
        this.send('advance');
      });
    },

    advance() {
      this.set('didValidate', true);

      this.validate().then(({validations}) => {
        if (validations.get('isValid')) {
          this.attrs.transition();
        }
      }, (errors) => {
        console.log('errors', errors);
      });
    }
  }
});
