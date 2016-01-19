import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('schedules/end-time', 'Integration | Component | schedules/end time', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });"

  this.render(hbs`{{schedules/end-time}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:"
  this.render(hbs`
    {{#schedules/end-time}}
      template block text
    {{/schedules/end-time}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
