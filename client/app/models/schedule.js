import DS from 'ember-data';

export default DS.Model.extend({
  date: DS.attr('date'),

  sitter: DS.belongsTo('sitter'),
  client: DS.belongsTo('client')
});
