import Ember from 'ember';

const {
  computed,
  observer
} = Ember;

import {
  validator, buildValidations
}
from 'ember-cp-validations';

let Validations = buildValidations({
  startDate: validator('presence', true),
  client: validator('presence', true),
  sitter: validator('presence', true)
});

export default Ember.Component.extend(Validations, {
  newSchedule: null,
  startDate: '',
  client: '',
  sitter: '',

  didValidate: false,

  isStartDateInvalid: computed.and('didValidate', 'validations.attrs.startDate.isInvalid'),
  isClientInvalid: computed.and('didValidate', 'validations.attrs.client.isInvalid'),
  isSitterInvalid: computed.and('didValidate', 'validations.attrs.sitter.isInvalid'),

  sendStartAt: observer('date', function(){
    if (this.get('date')) {
      this.set('startDate', this.get('date'));
      this.attrs.startsAt(this.get('date'));
    }
  }),

  actions: {
    clientSelected(client){
      this.set('client', client);
      this.sendAction('clientSelected', client);
    },

    sitterSelected(sitter){
      this.set('sitter', sitter);
      this.sendAction('sitterSelected', sitter);
    },

    advance(){
      this.set('didValidate', true);
      let comp = this;

      this.validate().then(({comp, validations}) => {
        if (validations.get('isValid')) {
          this.attrs.transitionToStartTime();
        }
      }, (errors) => {
        console.log('errors', errors);
      });
    }
  }
});
