import Ember from 'ember';

export default Ember.Route.extend({

  model(){
    return this.store.createRecord('client');
  },

  actions: {
    createClient(client){
      client.save().then(()=>{
        this.transitionTo('clients');
      });
    }
  }
});
