import DS from 'ember-data';

export default DS.Model.extend({
  startDate: DS.attr('date'),
  endDate: DS.attr('date'),

  sitter: DS.belongsTo('sitter'),
  client: DS.belongsTo('client')
});
