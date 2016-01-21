import Ember from 'ember';
import moment from 'moment';

import { formatDate } from 'client/helpers/format-date';

import {
  validator, buildValidations
}
from 'ember-cp-validations';

const { computed } = Ember;

let Validations = buildValidations({
  endDate: [
    validator('presence', true),
    validator('date', {
      description: 'Schedule end time',
      after() {
        return moment(this.model.get('startDate'));
      },
      message(){
        let startDate = formatDate(this.model.get('startDate'), {format: 'LT'});
        return `The end time needs to be after ${startDate}`;
      }
    })
  ]
});

export default Ember.Component.extend(Validations, {
  didValidate: false,
  startDate: null,
  endDate: null,

  endDateErrorMessage: computed.readOnly('validations.attrs.endDate.message'),
  showEndDateErrorMessage: computed.and('didValidate', 'endDateErrorMessage'),

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
