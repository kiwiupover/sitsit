import Ember from 'ember';

export default Ember.Route.extend({

  model(){
    return this.store.createRecord('sitter');
  },

  actions: {
    createSitter(sitter) {
      sitter.save().then(()=>{
        this.transitionTo('sitters');
      })
    }
  }
});
