import DS from 'ember-data';

export default DS.Model.extend({
  firstName: DS.attr('string'),
  phone: DS.attr('string'),
  schedules: DS.hasMany('schedule')
});
