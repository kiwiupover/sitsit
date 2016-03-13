import DS from 'ember-data';

export default DS.Model.extend({
  familyName: DS.attr('string'),
  primaryPhone: DS.attr('string'),
  secondaryPhone: DS.attr('string')
});
