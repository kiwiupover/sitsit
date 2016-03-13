import DS from 'ember-data';

export default DS.Model.extend({
  firstName: DS.attr('string'),
  phone: DS.attr('string'),
  parentPrimaryPhone: DS.attr('string'),
  parentSecondayPhone: DS.attr('string')
});
