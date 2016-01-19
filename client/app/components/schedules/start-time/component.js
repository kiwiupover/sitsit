import Ember from 'ember';
import {
  validator, buildValidations
}
from 'ember-cp-validations';

let Validations = buildValidations({
  startTime: validator('presence', true)
});

export default Ember.Component.extend(Validations, {
  didValidate: false,
  startTime: null,

  actions: {
    setStartTime(time){
      this.set('startTime', time);
      this.attrs.setTime(time);
      this.send('advance');
    },

    advance(){
      this.set('didValidate', true);

      this.validate().then(({validations}) => {
        if (validations.get('isValid')) {
          this.attrs.transitionToEndTime();
        }
      }, (errors) => {
        console.log('errors', errors);
      });
    }
  }
});
