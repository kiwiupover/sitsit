import Ember from 'ember';

const { computed, get } = Ember;

export default Ember.Component.extend({

  /**
   * Label of the select menu (optional).
   */
  label: null,

  /**
   * Class names to apply to the component's element.
   */
  classNameBindings: ['label:form-group', 'error:has-error'],

  /**
   * The error message (optional).
   */
  error: null,

  /**
   * The content of the select menu.
   */
  content: [],

  /**
   * The name of the property to use as value.
   */
  optionValue: 'value',

  /**
   * The name of the property to use as label.
   */
  optionLabel: 'label',

  /**
   * The currently selected value.
   */
  value: null,

  /**
   * Name of the field.
   */
  name: null,

  /**
   * Prompt displayed as the first option of the select menu (cannot be selected).
   */
  prompt: null,

  /**
   * Whether the select menu is disabled.
   */
  disabled: false,

  /**
   * Indicates whether the field is in edit mode.
   */
  isEditing: false,

  /**
   * Indicates whether the field should be marked as required.
   */
  isRequired: false,

  /**
   * Builds and returns the list of options based on the content.
   */
  options: computed.map('content', function(item) {
    return {
      value: get(item, this.get('optionValue')),
      label: get(item, this.get('optionLabel'))
    };
  }),

  /**
   * Returns the selected option.
   * @private
   */
  _selectedOptions: computed.filterBy('options', 'selected', 'selected'),
  selectedOption: computed.readOnly('_selectedOptions.firstObject'),

  /**
   * Sends an event upon value change.
   */
  change() {
    let optionValue = this.$('option:selected').val();
    this.sendAction('onSelect', optionValue);
  },

  /**
   * Returns a unique ID to connect the label and the select.
   */
  inputElementId: computed('elementId', function() {
    return 'select-' + this.get('elementId');
  })
});
