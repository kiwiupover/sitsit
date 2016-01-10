import Ember from 'ember';

export default function(){
  if (Ember.testing) {
    this.setDefault({duration: 0 });
  } else {
    this.setDefault({duration: 350 });
  }

  var slideInOutEaseing = {easing: [ 0.38, 0, 0.88, 0.8]};

  this.transition(
    this.hasClass('crossFade'),
    this.toModel(true),
    this.use('crossFade'),
    this.reverse('crossFade')
  );

  this.transition(
    this.hasClass('fader'),
    this.use('fade')
  );

  this.transition(
    this.hasClass('left-to-right'),
    this.use('toLeft'),
    this.reverse('toRight')
  );

  this.transition(
    this.fromRoute('schedules.index'),
    this.toRoute('schedules.setup'),
    this.use('toLeft', slideInOutEaseing),
    this.reverse('toRight', slideInOutEaseing)
  );

  this.transition(
    this.fromRoute('schedules.setup.details'),
    this.toRoute('schedules.setup.start-time'),
    this.use('toLeft', slideInOutEaseing),
    this.reverse('toRight', slideInOutEaseing)
  );

  this.transition(
    this.fromRoute('schedules.setup.start-time'),
    this.toRoute('schedules.setup.end-time'),
    this.use('toLeft', slideInOutEaseing),
    this.reverse('toRight', slideInOutEaseing)
  );
}
