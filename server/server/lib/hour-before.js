import sendMessages from './send-messages';
import Schedule from '../api/schedule/schedule.model';
import moment from 'moment-timezone';

export default function() {
  let now = moment().tz("America/Los_Angeles");
  let hourBeforeNow = moment(now).subtract(1, 'hours');

  Schedule.find({

    startDate: {
      $gte: hourBeforeNow.format(),
      $lt: now.format(),
    },
    sentHourBeforeMessage: false

  }).exec(function (err, schedules) {

    if(err) { console.log('err', err); }

    if (schedules.length === 0 ) {
      console.log('No day of schedules to process');
    }

    return schedules.forEach((schedule) => {
      schedule.sentHourBeforeMessage = true;
      return schedule.save((err, savedSchedule)=>{
        if (err) { console.log('schedule save error', err)}
        return sendMessages(schedule);
      });
    });
  });
}
