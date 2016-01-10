import Ember from 'ember';

const { computed, observer } = Ember;

export default Ember.Component.extend({
  startsAt: null,

  sendStartAt: observer('startsAt', function(){
    if (this.startsAt) {
      this.sendAction('startsAt', this.get('startsAt'));
    }
  }),

  actions: {
    clientSelected(client){
      this.sendAction('clientSelected', client);
    },

    sitterSelected(sitter){
      this.sendAction('sitterSelected', sitter);
    }
  }
});
