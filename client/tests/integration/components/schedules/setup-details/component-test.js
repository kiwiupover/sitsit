import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('schedules/setup-details', 'Integration | Component | schedules/setup details', {
  integration: true
});

test('it renders', function(assert) {
  
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

  this.render(hbs`{{schedules/setup-details}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:" + EOL +
  this.render(hbs`
    {{#schedules/setup-details}}
      template block text
    {{/schedules/setup-details}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
