import Ember from 'ember';

export default Ember.Route.extend({

  model(){
    return Ember.RSVP.hash({
      clients: this.store.findAll('client'),
      sitters: this.store.findAll('sitter')
    });
  }
});
