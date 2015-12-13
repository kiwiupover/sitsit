import DS from 'ember-data';

export default DS.Model.extend({
  familyName: DS.attr('string'),
  phone: DS.attr('string')
});
