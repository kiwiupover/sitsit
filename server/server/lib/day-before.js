import sendMessages from './send-messages';
import Schedule from '../api/schedule/schedule.model';
import moment from 'moment-timezone';

export default function() {
  let now = moment().tz("America/Los_Angeles");
  let tomorrowDate = moment(now).clone().add(1, 'days');
  let tomorrowPlus1Hour = moment(tomorrowDate).clone().add(1, 'hours');

  Schedule.find({

    startDate: {
      $gte: tomorrowDate.format(),
      $lt: tomorrowPlus1Hour.format(),
    },
    sentDayBeforeMessage: false

  }).exec(function (err, schedules) {

    if(err) { console.log('err', err); }

    if (schedules.length === 0 ) {
      console.log('No day before schedules to process');
    }

    return schedules.forEach((schedule) => {
      schedule.sentDayBeforeMessage = true;
      return schedule.save((err, savedSchedule)=>{
        if (err) { console.log('schedule save error', err)}
        console.log('savedSchedule', savedSchedule);
        console.log('schedule', schedule);
        return sendMessages(schedule);
      });
    });
  });
}
